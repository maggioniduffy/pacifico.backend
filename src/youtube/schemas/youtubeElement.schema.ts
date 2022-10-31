import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type YoutubeElementDocument = YoutubeElement & Document;

@Schema()
export class YoutubeElement {
  @Prop({ required: true })
  src: string;

  @Prop({ required: true })
  text: string;
}

export const YoutubeElementSchema =
  SchemaFactory.createForClass(YoutubeElement);
