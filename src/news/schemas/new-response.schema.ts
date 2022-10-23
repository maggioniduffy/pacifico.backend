import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NewResponseDocument = NewResponse & Document;

@Schema()
export class NewResponse {
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
  image: string;

  @Prop({ required: true, default: Date.now() })
  time: Date;
}

export const NewResponseSchema = SchemaFactory.createForClass(NewResponse);
