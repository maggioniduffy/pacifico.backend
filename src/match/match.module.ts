import { FilesModule } from './../files/files.module';
import { Match, MatchSchema } from './schemas/match.schema';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { GridFsMulterConfigService } from 'src/multer-config/services/multer-config.service';
import { MatchController } from './controllers/match.controller';
import { MatchService } from './services/match.service';

@Module({
  imports: [
    ConfigModule,
    MulterModule.registerAsync({
      useClass: GridFsMulterConfigService,
    }),
    MongooseModule.forFeature([{ name: Match.name, schema: MatchSchema }]),
    FilesModule,
  ],
  controllers: [MatchController],
  providers: [MatchService],
})
export class MatchModule {}
