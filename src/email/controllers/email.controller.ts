import { SendEmailDto } from './../dtos/sendEmail.dto';
import { EmailService } from './../services/email.service';
import { Body, Controller, Get, Logger, Post } from '@nestjs/common';

@Controller('email')
export class EmailController {
  private logger = new Logger('EmailController');
  constructor(private readonly emailService: EmailService) {}

  @Post()
  public sendEmail(@Body() sendEmailDto: SendEmailDto) {
    console.log('sending mail');
    this.logger.verbose('Sending email');
    return this.emailService.sendEmail(sendEmailDto);
  }

  @Get()
  public ping() {
    this.logger.verbose('Ping');
    return 'Ping';
  }
}
