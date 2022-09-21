import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import e from 'express';
import { Model } from 'mongoose';
import { CreateNewDto } from '../dto/CreateNewDto.dto';
import { EditNewDto } from '../dto/EditNewDto.dto';
import { SearchNewsDto } from '../dto/SearchNewsDto.dto';
import { New, NewDocument } from '../schemas/new.schema';

@Injectable()
export class NewsService {
  constructor(@InjectModel(New.name) private newModel: Model<NewDocument>) {}

  addNew(newDto: CreateNewDto): Promise<New> {
    const createdNew = new this.newModel(newDto);
    return createdNew.save();
  }

  getNews(
    searchNewsDto: SearchNewsDto,
    offset = 0,
    quantity = 10,
  ): Promise<New[]> {
    const { search } = searchNewsDto;
    const query = !search
      ? null
      : {
          title: { $regex: search },
          subtitle: { $regex: search },
        };
    console.log(query);
    return this.newModel.find(query, { date: 'asc' }).exec();
  }

  async editNew(id: string, editDto: EditNewDto): Promise<New> {
    const doc = await this.newModel.findByIdAndUpdate({ _id: id }, editDto, {
      new: true,
    });
    return doc;
  }
}
