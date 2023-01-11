import { SearchYoutubeElementsDto } from './../dto/searchYoutubeElements.dto';
import { YoutubeElement } from './../schemas/youtubeElement.schema';
import { CreateYoutubeElementDto } from './../dto/createYoutubeElement.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { YoutubeService } from '../services/youtube.service';
import { Public } from 'src/public.decorator';

@Controller('youtube')
export class YoutubeController {
  private logger = new Logger('YoutubeController');
  constructor(private youtubeService: YoutubeService) {}

  @Public()
  @Get()
  getYoutubeElems(
    @Query() filterDto: SearchYoutubeElementsDto,
  ): Promise<YoutubeElement[]> {
    this.logger.verbose(
      `Retrieving youtube elems. Filters "${JSON.stringify(filterDto)}"`,
    );

    return this.youtubeService.getYoutubeElements(filterDto);
  }

  @Public()
  @Get('/:id')
  getYoutubeElemById(@Param('id') id: string): Promise<YoutubeElement> {
    this.logger.verbose('Getting youtube element by id');
    return this.youtubeService.getYoutubeElementById(id);
  }

  @Delete('/:id')
  deleteYoutubeElem(@Param('id') id: string): Promise<YoutubeElement> {
    this.logger.verbose('Deletting youtube element by id', id);
    return this.youtubeService.deleteYoutubeElement(id);
  }

  @Post()
  addYoutubeElem(
    @Body() addYoutubeElementDto: CreateYoutubeElementDto,
  ): Promise<YoutubeElement> {
    this.logger.verbose(
      `Creating youtube elem. Data "${JSON.stringify(addYoutubeElementDto)}"`,
    );
    return this.youtubeService.addYoutubeElement(addYoutubeElementDto);
  }
}
