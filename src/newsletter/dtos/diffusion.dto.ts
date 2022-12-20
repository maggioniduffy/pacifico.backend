import { IsNotEmpty, IsString } from 'class-validator';

export class DiffusionDTO {
  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
