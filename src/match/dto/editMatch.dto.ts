import { Category } from './../models/category.enum';
import { Gender } from './../models/gender.enum';
import { Condition } from './../models/condition.enum';

export class EditMatchDto {
  rival_name?: string;
  time?: Date;
  condition?: Condition;
  gender?: Gender;
  category?: Category;
  played?: boolean;
  field?: string;
  our_score?: number;
  rival_score?: number;
  stats_link?: string;
  transmission_link: string;
  tournament?: string;
}
