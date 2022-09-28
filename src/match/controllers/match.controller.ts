import { MatchService } from './../services/match.service';
import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
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

@Controller('matchs')
export class MatchController {
  constructor(private matchService: MatchService) {}

  @Get()
  getMatchs(@Query() filterDto: SearchMatchesDto): Promise<Match[]> {
    return this.matchService.getMatches(filterDto);
  }

  @Get('/:id')
  getMatchById(@Param('id') id: string): Promise<Match> {
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
