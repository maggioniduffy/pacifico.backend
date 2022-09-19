import { Image } from '../schemas/image.schema';

export class CreateNewDto {
  title: string;
  image: Image;
  subtitle: string;
  body: string;
}
