import { EditNewDto } from './../dto/EditNewDto.dto';
import { NewsService } from './../services/news.service';
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
import { SearchNewsDto } from '../dto/SearchNewsDto.dto';
import { New } from '../schemas/new.schema';
import { CreateNewDto } from '../dto/CreateNewDto.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('news')
export class NewsController {
  private logger = new Logger('NewsController');
  constructor(private newsService: NewsService) {}

  @Get()
  getNews(@Query() filterDto: SearchNewsDto): Promise<New[]> {
    this.logger.verbose(
      `Retrieving news. Filters "${JSON.stringify(filterDto)}"`,
    );

    return this.newsService.getNews(filterDto);
  }

  @Get('/:id')
  getNewById(@Param('id') id: string): Promise<New> {
    this.logger.verbose('Getting new by id');
    return this.newsService.getNewById(id);
  }

  @Delete('/:id')
  deleteNew(@Param('id') id: string): Promise<New> {
    this.logger.verbose('Deletting new by id');
    return this.newsService.deleteNew(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  addNew(
    @Body() addNewDto: CreateNewDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          //new MaxFileSizeValidator({ maxSize: 100000 }),
          new FileTypeValidator({ fileType: 'jpeg' }),
        ],
      }),
    )
    file: Express,
  ): Promise<New> {
    this.logger.verbose(`Creating new. Data "${JSON.stringify(addNewDto)}"`);
    return this.newsService.addNew(addNewDto, file);
  }

  @Patch('/:id')
  updateNew(@Param('id') id: string, @Body() updateNewDto: EditNewDto) {
    return this.newsService.updateNew(id, updateNewDto);
  }
}
