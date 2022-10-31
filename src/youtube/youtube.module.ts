import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { YoutubeController } from './controllers/youtube.controller';
import {
  YoutubeElement,
  YoutubeElementSchema,
} from './schemas/youtubeElement.schema';
import { YoutubeService } from './services/youtube.service';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: YoutubeElement.name, schema: YoutubeElementSchema },
    ]),
  ],
  controllers: [YoutubeController],
  providers: [YoutubeService],
})
export class YoutubeModule {}
