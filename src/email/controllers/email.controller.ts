import { SendEmailDto } from './../dtos/sendEmail.dto';
import { EmailService } from './../services/email.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  public sendEmail(@Body() sendEmailDto: SendEmailDto) {
    return this.emailService.sendEmail(sendEmailDto);
  }
}
