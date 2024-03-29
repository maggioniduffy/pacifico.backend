import { AwsModule } from './../aws/aws.module';
import { FilesModule } from './../files/files.module';
import { Match, MatchSchema } from './schemas/match.schema';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MatchController } from './controllers/match.controller';
import { MatchService } from './services/match.service';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: Match.name, schema: MatchSchema }]),
    FilesModule,
    AwsModule,
  ],
  controllers: [MatchController],
  providers: [MatchService],
})
export class MatchModule {}
