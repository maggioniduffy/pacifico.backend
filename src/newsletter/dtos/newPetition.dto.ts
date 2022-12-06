import { IsNotEmpty, IsEmail } from 'class-validator';

export class NewPetitionDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
