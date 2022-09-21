import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Express } from 'express';

export type NewDocument = New & Document;

@Schema()
export class New {
  @Prop({ required: true })
  title: string;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Image', required: true })
  // image: Image;

  @Prop({ required: true })
  subtitle: string;

  @Prop({ required: true })
  body: string;

  @Prop({ required: true })
  imageName: string;

  @Prop({ required: true })
  imageDesc: string;

  @Prop({ required: true })
  image: Express;

  @Prop({ required: true, default: Date.now() })
  time: Date;
}

export const NewSchema = SchemaFactory.createForClass(New);
