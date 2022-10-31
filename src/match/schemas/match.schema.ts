import { RivalIcon } from '../models/rival_icon';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Gender } from '../models/gender.enum';
import { Category } from '../models/category.enum';
import { Condition } from '../models/condition.enum';

export type MatchDocument = Match & Document;

@Schema()
export class Match {
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

  @Prop()
  tournament: string;
}

export const MatchSchema = SchemaFactory.createForClass(Match);
