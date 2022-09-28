import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNewDto } from '../dto/createNew.dto';
import { EditNewDto } from '../dto/editNew.dto';
import { SearchNewsDto } from '../dto/searchNews.dto';
import { New, NewDocument } from '../schemas/new.schema';
import { Express } from 'express';

@Injectable()
export class NewsService {
  constructor(@InjectModel(New.name) private newModel: Model<NewDocument>) {}

  async addNew(newDto: CreateNewDto, file: Express): Promise<New> {
    const actualNew = { ...newDto, date: Date.now(), image: file };
    const createdNew = new this.newModel(actualNew);
    return createdNew.save();
  }

  async getNews(searchNewsDto: SearchNewsDto): Promise<New[]> {
    const { search, skip = 0, limit = 10 } = searchNewsDto;
    if (search) {
      const query = !search
        ? null
        : {
            title: { $regex: search },
            subtitle: { $regex: search },
          };
      console.log(query);
      return this.newModel
        .find(query, { date: 'asc' })
        .skip(skip)
        .limit(limit)
        .exec();
    }
    return this.newModel.find({ date: 'asc' }).skip(skip).limit(limit).exec();
  }

  async getNewById(id: string): Promise<New> {
    const doc = await this.newModel.findById(id);
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
