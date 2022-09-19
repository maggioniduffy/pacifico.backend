import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Image } from './image.schema';

export type NewDocument = New & Document;

@Schema()
export class New {
  @Prop({ required: true })
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Image', required: true })
  image: Image;

  @Prop({ required: true })
  subtitle: string;

  @Prop({ required: true })
  body: string;

  @Prop({ required: true, default: Date.now() })
  time: Date;
}

export const NewSchema = SchemaFactory.createForClass(New);
