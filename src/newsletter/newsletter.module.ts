import { EmailModule } from './../email/email.module';
import {
  SuscribedEmail,
  SuscribedEmailSchema,
} from './schemas/suscribedEmail.schema';
import {
  PendingEmail,
  PendingEmailSchema,
} from './schemas/pendingEmail.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsletterController } from './controllers/newsletter.controller';
import { NewsletterService } from './services/newsletter.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule,
    JwtModule,
    EmailModule,
    MongooseModule.forFeature([
      { name: PendingEmail.name, schema: PendingEmailSchema },
      { name: SuscribedEmail.name, schema: SuscribedEmailSchema },
    ]),
  ],
  controllers: [NewsletterController],
  providers: [NewsletterService],
})
export class NewsletterModule {}
