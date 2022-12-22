import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsString } from 'class-validator';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  @IsEmail()
  email: string;

  @Prop({ required: true, unique: true })
  @IsString()
  username: string;

  @Prop({ required: true })
  @IsString()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
