import { S3Service } from './../../aws/services/s3.service';
import { Match, MatchDocument } from './../schemas/match.schema';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Express } from 'express';
import { CreateMatchDto } from '../dto/createMatch.dto';
import { SearchMatchesDto } from '../dto/searchMatches.dto';
import { EditMatchDto } from '../dto/editMatch.dto';

@Injectable()
export class MatchService {
  private logger = new Logger('MatchsService');
  constructor(
    @InjectModel(Match.name) private matchModel: Model<MatchDocument>,
    @Inject(S3Service)
    private readonly s3Service: S3Service,
  ) {}

  async addMatch(matchDto: CreateMatchDto, rivalIcon?: Express) {
    if (rivalIcon) {
      const { Location } = await this.s3Service.uploadFile(rivalIcon);
      this.logger.verbose('Location', Location);
      const actualMatch = { ...matchDto, rival_icon: Location };

      const createdMatch = new this.matchModel(actualMatch);
      return createdMatch.save();
    }

    const createdMatch = new this.matchModel(matchDto);
    return createdMatch.save();
  }

  async getMatches(searchMatchsDto: SearchMatchesDto): Promise<Match[]> {
    const { skip = 0, limit = 10 } = searchMatchsDto;
    const docs = await this.matchModel
      .find({})
      .sort({ time: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
    return docs;
  }

  async getMatchById(id: string): Promise<Match> {
    const doc = await this.matchModel.findById(id);
    return doc;
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
