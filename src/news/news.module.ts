import { New, NewSchema } from './schemas/new.schema';
import { Module } from '@nestjs/common';
import { NewsService } from './services/news.service';
import { NewsController } from './controllers/news.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: New.name, schema: NewSchema }])],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
