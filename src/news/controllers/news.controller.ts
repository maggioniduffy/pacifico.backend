import { EditNewDto } from '../dto/editNew.dto';
import { NewsService } from './../services/news.service';
import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Logger,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SearchNewsDto } from '../dto/searchNews.dto';
import { New } from '../schemas/new.schema';
import { CreateNewDto } from '../dto/createNew.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { Public } from 'src/public.decorator';

@Controller('news')
export class NewsController {
  private logger = new Logger('NewsController');
  constructor(private newsService: NewsService) {}

  @Public()
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
    @UploadedFile(new ParseFilePipe())
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
