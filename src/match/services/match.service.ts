import { Match, MatchDocument } from './../schemas/match.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Express } from 'express';
import { CreateMatchDto } from '../dto/createMatch.dto';
import { SearchMatchesDto } from '../dto/searchMatches.dto';
import { EditMatchDto } from '../dto/editMatch.dto';

@Injectable()
export class MatchService {
  constructor(
    @InjectModel(Match.name) private matchModel: Model<MatchDocument>,
  ) {}

  async addMatch(matchDto: CreateMatchDto, rivalIcon?: Express) {
    const actualMatch = rivalIcon
      ? { ...matchDto, rival_icon: rivalIcon }
      : matchDto;

    const createdMatch = new this.matchModel(actualMatch);
    return createdMatch.save();
  }

  async getMatches(searchMatchsDto: SearchMatchesDto): Promise<Match[]> {
    const { skip = 0, limit = 10 } = searchMatchsDto;
    return this.matchModel.find({ date: 'asc' }).skip(skip).limit(limit).exec();
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
