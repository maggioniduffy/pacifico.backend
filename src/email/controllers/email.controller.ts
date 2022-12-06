import { SendContactEmailDto } from '../dtos/sendContactEmail.dto';
import { EmailService } from './../services/email.service';
import { Body, Controller, Get, Logger, Post } from '@nestjs/common';

@Controller('email')
export class EmailController {
  private logger = new Logger('EmailController');
  constructor(private readonly emailService: EmailService) {}

  @Post()
  public sendContactEmail(@Body() sendContactEmailDto: SendContactEmailDto) {
    this.logger.verbose('Sending contact email');
    return this.emailService.sendContactEmail(sendContactEmailDto);
  }

  @Get()
  public ping() {
    this.logger.verbose('Ping');
    return 'Ping';
  }
}
