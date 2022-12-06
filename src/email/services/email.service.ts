import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { SendContactEmailDto } from '../dtos/sendContactEmail.dto';
import { SendEmailDto } from '../dtos/sendEmail.dto';

@Injectable()
export class EmailService {
  private logger = new Logger('EmailService');
  constructor(
    private readonly mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  public async sendContactEmail(sendContactEmailDto: SendContactEmailDto) {
    this.logger.verbose(this.configService.get<string>('EMAIL_USERNAME'));
    try {
      const res = await this.mailerService.sendMail({
        to: this.configService.get<string>('EMAIL_USERNAME'),
        from: sendContactEmailDto.from,
        sender: sendContactEmailDto.name,
        subject: sendContactEmailDto.name + ' | ' + sendContactEmailDto.subject,
        //text: sendEmailDto.message,
        html: ` <h3> ${sendContactEmailDto.from} </h3>
        <p> ${sendContactEmailDto.message} </p>`,
      });
      this.logger.verbose(res);
      return res;
    } catch (error) {
      this.logger.error(error);
    }
  }

  public async sendEmail(sendEmailDto: SendEmailDto) {
    this.logger.verbose(this.configService.get<string>('EMAIL_USERNAME'));
    try {
      const res = await this.mailerService.sendMail({
        from: this.configService.get<string>('EMAIL_USERNAME'),
        to: sendEmailDto.to,
        subject: sendEmailDto.subject,
        html: ` <p> ${sendEmailDto.message} </p>`,
      });
      this.logger.verbose(res);
      return res;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
