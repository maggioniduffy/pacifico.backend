import { NewsletterService } from './../services/newsletter.service';
import { Body, Controller, Logger, Post } from '@nestjs/common';
import { NewPetitionDto } from '../dtos/newPetition.dto';
import { ConfirmEmailDto } from '../dtos/confirmEmail.dto';
import { DiffusionDTO } from '../dtos/diffusion.dto';

@Controller('newsletter')
export class NewsletterController {
  private logger = new Logger('Newsletter controller');
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post('register')
  async register(@Body() registrationData: NewPetitionDto) {
    this.logger.verbose('registering email', registrationData.email);
    return await this.newsletterService.sendVerificationLink(
      registrationData.email,
    );
  }

  @Post('confirm')
  async confirm(@Body() confirmationData: ConfirmEmailDto) {
    this.logger.verbose('confirming email', confirmationData);
    const email = await this.newsletterService.decodeConfirmationToken(
      confirmationData.token,
    );
    await this.newsletterService.confirmEmail(email);
  }

  @Post('diffusion')
  async diffusion(@Body() diffusionDto: DiffusionDTO) {
    this.logger.verbose('sending diffusion', diffusionDto.message);
    return await this.newsletterService.sendDiffusion(diffusionDto);
  }
}
