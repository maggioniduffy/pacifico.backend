import { FilesService } from './../../files/services/files.service';
import { Match, MatchDocument } from './../schemas/match.schema';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Express } from 'express';
import { CreateMatchDto } from '../dto/createMatch.dto';
import { SearchMatchesDto } from '../dto/searchMatches.dto';
import { EditMatchDto } from '../dto/editMatch.dto';
import { MatchResponse } from '../schemas/match-response.schema';
import * as fs from 'fs';

@Injectable()
export class MatchService {
  private logger = new Logger('MachtsService');
  constructor(
    @InjectModel(Match.name) private matchModel: Model<MatchDocument>,
    @Inject(FilesService)
    private readonly filesService: FilesService,
  ) {}

  async addMatch(matchDto: CreateMatchDto, rivalIcon?: Express) {
    const actualMatch = rivalIcon
      ? { ...matchDto, rival_icon: rivalIcon }
      : matchDto;

    const createdMatch = new this.matchModel(actualMatch);
    return createdMatch.save();
  }

  async getMatches(searchMatchsDto: SearchMatchesDto) {
    const { skip = 0, limit = 10 } = searchMatchsDto;
    const docs = await this.matchModel
      .find({ date: 'asc' })
      .skip(skip)
      .limit(limit)
      .exec();
    const res = docs.map(async (doc) => {
      const rival_icon_id = doc.rival_icon.id;
      const filestream = await this.filesService.downloadFile(rival_icon_id);
      const image = fs.readFileSync(filestream, 'base64');
      this.logger.verbose(image);
      return this.matchToResponse(doc, image);
    });
    return res;
  }

  private matchToResponse(doc: MatchDocument, imageAsBase64: string) {
    const res: MatchResponse = {
      gender: doc.gender,
      category: doc.category,
      field: doc.field,
      rival_name: doc.rival_name,
      time: doc.time,
      condition: doc.condition,
      played: doc.played,
      rival_icon: imageAsBase64,
      stats_link: doc.stats_link,
      transmission_link: doc.transmission_link,
      our_score: doc.our_score,
      rival_score: doc.rival_score,
    };
    return res;
  }

  async getMatchById(id: string): Promise<MatchResponse> {
    const doc = await this.matchModel.findById(id);
    this.logger.verbose(doc);
    const rival_icon_id = doc.rival_icon.id;
    const filestream = await this.filesService.downloadFile(rival_icon_id);
    const imageAsBase64 = fs.readFileSync(filestream, 'base64');
    return this.matchToResponse(doc, imageAsBase64);
  }

  async updateMatch(id: string, editDto: EditMatchDto): Promise<Match> {
    const doc = await this.matchModel.findByIdAndUpdate({ _id: id }, editDto, {
      new: true,
    });
    return doc;
  }

  async deleteMatch(id: string): Promise<Match> {
    const doc = await this.matchModel.findByIdAndDelete(id);
    return doc;
  }
}
