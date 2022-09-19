import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNewDto } from '../dto/CreateNewDto.dto';
import { New, NewDocument } from '../schemas/new.schema';

@Injectable()
export class NewsService {
  constructor(@InjectModel(New.name) private newModel: Model<NewDocument>) {}

  addNew(newDto: CreateNewDto): Promise<New> {
    const createdNew = new this.newModel(newDto);
    return createdNew.save();
  }

  getAllNews(): Promise<New[]> {
    return this.newModel.find({ date: 'asc' }).exec();
  }
}
