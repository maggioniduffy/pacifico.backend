import { FilesModule } from './../files/files.module';
import { New, NewSchema } from './schemas/new.schema';
import { Module } from '@nestjs/common';
import { NewsService } from './services/news.service';
import { NewsController } from './controllers/news.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { GridFsMulterConfigService } from 'src/multer-config/services/multer-config.service';

@Module({
  imports: [
    ConfigModule,
    MulterModule.registerAsync({
      useClass: GridFsMulterConfigService,
    }),
    MongooseModule.forFeature([{ name: New.name, schema: NewSchema }]),
    FilesModule,
  ],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
