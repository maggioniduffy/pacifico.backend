import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { SendEmailDto } from '../dtos/sendEmail.dto';

@Injectable()
export class EmailService {
  private logger = new Logger('EmailService');
  constructor(
    private readonly mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  public async sendEmail(sendEmailDto: SendEmailDto) {
    this.logger.verbose(this.configService.get<string>('EMAIL_USERNAME'));
    try {
      const res = await this.mailerService.sendMail({
        to: this.configService.get<string>('EMAIL_USERNAME'),
        from: sendEmailDto.from,
        sender: sendEmailDto.name,
        subject: sendEmailDto.name + ' | ' + sendEmailDto.subject,
        //text: sendEmailDto.message,
        html: ` <h3> ${sendEmailDto.from} </h3>
        <p> ${sendEmailDto.message} </p>`,
      });
      this.logger.verbose(res);
      return res;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
