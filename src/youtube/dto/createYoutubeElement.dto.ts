import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateYoutubeElementDto {
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  src: string;

  @IsNotEmpty()
  @IsString()
  text: string;
}
