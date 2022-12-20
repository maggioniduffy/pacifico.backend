import {
  SuscribedEmail,
  SuscribedEmailDocument,
} from './../schemas/suscribedEmail.schema';
import {
  PendingEmail,
  PendingEmailDocument,
} from './../schemas/pendingEmail.schema';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/email/services/email.service';
import { NewPetitionDto } from '../dtos/newPetition.dto';
import { DiffusionDTO } from '../dtos/diffusion.dto';

@Injectable()
export class NewsletterService {
  private logger = new Logger('NewsletterService');
  constructor(
    @InjectModel(PendingEmail.name)
    private pendingModel: Model<PendingEmailDocument>,
    @InjectModel(SuscribedEmail.name)
    private suscribedModel: Model<SuscribedEmailDocument>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}

  public async sendVerificationLink(email: string) {
    const suscribedEmail = await this.suscribedModel.find({ email });
    console.log(suscribedEmail);
    if (suscribedEmail || suscribedEmail.length > 0) {
      console.log('bad exception');
      throw new BadRequestException('Email already suscribed');
    }
    const payload: NewPetitionDto = { email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME',
      )}s`,
    });

    const url = `${this.configService.get(
      'EMAIL_CONFIRMATION_URL',
    )}?token=${token}`;

    const newPetition = await this.pendingModel.create({
      email,
      token,
      timestamp: Date.now(),
    });

    newPetition.save();

    const text = `Bienvendio al newsletter del Decano. Para confirmar esta direccion de correo, hace click aqui: \n ${url}`;

    return this.emailService.sendEmail({
      to: email,
      subject: 'Confirmacion de email',
      message: text,
    });
  }

  public async confirmEmail(email: string) {
    this.logger.verbose('Confirming email', email);
    await this.pendingModel.findOneAndDelete({ email });
    const newSuscription = await this.suscribedModel.create({ email });
    return newSuscription.save();
  }

  public async decodeConfirmationToken(token: string) {
    this.logger.verbose('decoding token', token);
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }

  public async sendDiffusion(diffusionPayload: DiffusionDTO) {
    const emails = await this.suscribedModel.find();
    const directions = emails.map((e) => e.email);
    return this.emailService.sendDiffusion({
      to: directions,
      subject: diffusionPayload.subject,
      message: diffusionPayload.message,
    });
  }
}
