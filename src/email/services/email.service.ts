import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendEmailDto } from '../dtos/sendEmail.dto';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  public async sendEmail(sendEmailDto: SendEmailDto) {
    try {
      const res = await this.mailerService.sendMail({
        to: this.configService.get<string>('SERVER_EMAIL'),
        from: sendEmailDto.from,
        subject: sendEmailDto.name + ' | ' + sendEmailDto.subject,
        text: sendEmailDto.message,
        html: `<p> ${sendEmailDto.message} </p>`,
      });
      return res;
    } catch (error) {}
  }
}
