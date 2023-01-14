import { S3Service } from './../../aws/services/s3.service';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateNewDto } from '../dto/createNew.dto';
import { EditNewDto } from '../dto/editNew.dto';
import { SearchNewsDto } from '../dto/searchNews.dto';
import { New, NewDocument, PlainNew } from '../schemas/new.schema';
import { Express } from 'express';

@Injectable()
export class NewsService {
  private logger = new Logger('NewsService');
  constructor(
    @InjectModel(New.name) private newModel: Model<NewDocument>,
    @Inject(S3Service) private readonly s3Service: S3Service,
  ) {}

  async addNew(newDto: CreateNewDto, file: Express): Promise<New> {
    const { Location } = await this.s3Service.uploadFile(file);
    this.logger.verbose('Location', Location);
    const actualNew = { ...newDto, date: Date.now(), image: Location };
    const createdNew = new this.newModel(actualNew);
    return createdNew.save();
  }

  async getNews(searchNewsDto: SearchNewsDto): Promise<PlainNew[]> {
    const { search, skip = 0, limit = 10 } = searchNewsDto;
    if (search) {
      const filters: FilterQuery<NewDocument> = {};
      filters.$text = {
        $search: search,
      };
      const query = this.newModel
        .find(filters)
        .sort({ _id: 1 })
        .skip(skip)
        .limit(limit);
      const res = await query;
      console.log(res);
      return res;
    }
    const res = await this.newModel
      .find({})
      .sort({ time: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    const docs = res.map((d) => d.toObject() as PlainNew);

    this.logger.verbose('NEWS RES (toObject): ', docs);
    return docs;
  }

  async getNewById(id: string): Promise<PlainNew> {
    const doc = (await this.newModel.findById(id)).toObject() as PlainNew;
    this.logger.verbose('NEW WITH ID ' + id + ': ', doc);
    return doc;
  }

  async updateNew(id: string, editDto: EditNewDto): Promise<New> {
    const doc = await this.newModel.findByIdAndUpdate({ _id: id }, editDto, {
      new: true,
    });
    return doc;
  }

  async deleteNew(id: string): Promise<New> {
    const doc = await this.newModel.findByIdAndDelete(id);
    return doc;
  }
}
