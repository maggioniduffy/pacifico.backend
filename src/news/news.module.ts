import { AwsModule } from './../aws/aws.module';
import { New, NewSchema } from './schemas/new.schema';
import { Module } from '@nestjs/common';
import { NewsService } from './services/news.service';
import { NewsController } from './controllers/news.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: New.name, schema: NewSchema }]),
    AwsModule,
  ],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
