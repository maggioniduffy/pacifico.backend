import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Gender } from '../models/gender.enum';
import { Category } from '../models/category.enum';
import { Condition } from '../models/condition.enum';

export type MatchResponseDocument = MatchResponse & Document;

@Schema()
export class MatchResponse {
  @Prop({ required: true })
  gender: Gender;

  @Prop({ required: true })
  category: Category;

  @Prop({ required: true })
  field: string;

  @Prop({ required: true })
  rival_name: string;

  @Prop({ required: true })
  time: Date;

  @Prop({ required: true })
  condition: Condition;

  @Prop({ required: true, default: false })
  played: boolean;

  @Prop()
  rival_icon: string;

  @Prop()
  stats_link: string;

  @Prop()
  transmission_link: string;

  @Prop()
  our_score: number;

  @Prop()
  rival_score: number;
}

export const MatchResponseSchema = SchemaFactory.createForClass(MatchResponse);
