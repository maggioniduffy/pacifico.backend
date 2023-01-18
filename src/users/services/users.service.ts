import { UserDocument } from './../schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { User } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username });
  }

  async createOne(
    username: string,
    email: string,
    password: string,
  ): Promise<User | undefined> {
    const createdUser = new this.userModel({ username, email, password });
    return createdUser.save();
  }
}
