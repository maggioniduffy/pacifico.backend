import { Category } from '../models/category.type';
import { Gender } from '../models/gender.type';

export class CreateMatchDto {
  rival: string;
  field: string;
  time: Date;
  gender: Gender;
  categorie: Category;
  stats_link?: string;
  transmission_link?: string;
  our_score?: number;
  rival_score?: number;
  played: boolean;
}
