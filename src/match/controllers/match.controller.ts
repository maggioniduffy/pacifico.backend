import { MatchService } from './../services/match.service';
import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Logger,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { Match } from '../schemas/match.schema';
import { SearchMatchesDto } from '../dto/searchMatches.dto';
import { CreateMatchDto } from '../dto/createMatch.dto';
import { EditMatchDto } from '../dto/editMatch.dto';
import { MatchResponse } from '../schemas/match-response.schema';

@Controller('matches')
export class MatchController {
  private logger = new Logger('Matches');
  constructor(private matchService: MatchService) {}

  @Get()
  async getMatchs(@Query() filterDto: SearchMatchesDto) {
    this.logger.verbose('Retrieving matches, Filters: ', filterDto);
    try {
      const res = await this.matchService.getMatches(filterDto);
      this.logger.verbose('Matchs res: ', res);
      return res;
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Get('/:id')
  getMatchById(@Param('id') id: string): Promise<MatchResponse> {
    return this.matchService.getMatchById(id);
  }

  @Delete('/:id')
  deleteNew(@Param('id') id: string): Promise<Match> {
    return this.matchService.deleteMatch(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  addNew(
    @Body() addMatchDto: CreateMatchDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100000 }),
          new FileTypeValidator({ fileType: 'jpeg' }),
        ],
      }),
    )
    file: Express,
  ): Promise<Match> {
    return this.matchService.addMatch(addMatchDto, file);
  }

  @Patch('/:id')
  updateNew(@Param('id') id: string, @Body() updateMatchDto: EditMatchDto) {
    return this.matchService.updateMatch(id, updateMatchDto);
  }
}
