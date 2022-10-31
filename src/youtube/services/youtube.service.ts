import { YoutubeElement } from './../schemas/youtubeElement.schema';
import { Inject, Injectable, Logger, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { S3Service } from 'src/aws/services/s3.service';
import { New } from 'src/news/schemas/new.schema';
import { YoutubeElementDocument } from '../schemas/youtubeElement.schema';
import { CreateYoutubeElementDto } from '../dto/createYoutubeElement.dto';
import { SearchYoutubeElementsDto } from '../dto/searchYoutubeElements.dto';

@Injectable()
export class YoutubeService {
  private logger = new Logger('YoutubeService');
  constructor(
    @InjectModel(YoutubeElement.name)
    private youtubeModel: Model<YoutubeElementDocument>,
  ) {}

  async addYoutubeElement(youtubeElem: CreateYoutubeElementDto) {
    const createdElem = new this.youtubeModel(youtubeElem);
    return createdElem.save();
  }

  async getYoutubeElementById(id: string) {
    const doc = await this.youtubeModel.findById(id);
    return doc;
  }

  async deleteYoutubeElement(id: string) {
    const doc = await this.youtubeModel.findByIdAndDelete(id);
    return doc;
  }

  async getToutubeElements(
    searchYoutubeElementsDto: SearchYoutubeElementsDto,
  ): Promise<YoutubeElement[]> {
    const { search, skip = 0, limit = 10 } = searchYoutubeElementsDto;
    if (search) {
      const query = !search
        ? null
        : {
            text: { $regex: search },
          };
      console.log(query);
      return this.youtubeModel
        .find(query, { date: 'asc' })
        .skip(skip)
        .limit(limit)
        .exec();
    }
    return this.youtubeModel
      .find({ date: 'asc' })
      .skip(skip)
      .limit(limit)
      .exec();
  }
}
