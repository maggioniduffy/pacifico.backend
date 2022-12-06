import { NewsletterService } from './../services/newsletter.service';
import { Body, Controller, Post } from '@nestjs/common';
import { NewPetitionDto } from '../dtos/newPetition.dto';
import { ConfirmEmailDto } from '../dtos/confirmEmail.dto';

@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post('register')
  async register(@Body() registrationData: NewPetitionDto) {
    return await this.newsletterService.sendVerificationLink(
      registrationData.email,
    );
  }

  @Post('confirm')
  async confirm(@Body() confirmationData: ConfirmEmailDto) {
    const email = await this.newsletterService.decodeConfirmationToken(
      confirmationData.token,
    );
    await this.newsletterService.confirmEmail(email);
  }
}
