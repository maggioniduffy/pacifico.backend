import { Category } from '../models/category.enum';
import { Gender } from '../models/gender.enum';
import { IsNotEmpty, IsEnum, IsDateString } from 'class-validator';
import { Condition } from '../models/condition.enum';

export class CreateMatchDto {
  @IsNotEmpty()
  rival_name: string;

  @IsNotEmpty()
  field: string;

  @IsNotEmpty()
  @IsDateString()
  time: string;

  @IsNotEmpty()
  @IsEnum(Condition)
  condition: Condition;

  @IsNotEmpty()
  @IsEnum(Gender, {
    message: 'Gender should be F or M',
  })
  gender: Gender;

  @IsNotEmpty()
  @IsEnum(Category, {
    message: 'Category should be U13, U15, U17, U19 or 1ra',
  })
  category: Category;

  @IsNotEmpty()
  played: boolean;
  stats_link?: string;
  transmission_link?: string;
  our_score?: number;
  rival_score?: number;
}
