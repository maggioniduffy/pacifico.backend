import {
  SuscribedEmail,
  SuscribedEmailDocument,
} from './../schemas/suscribedEmail.schema';
import {
  PendingEmail,
  PendingEmailDocument,
} from './../schemas/pendingEmail.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class NewsletterService {
  constructor(
    @InjectModel(PendingEmail.name)
    private pendingModel: Model<PendingEmailDocument>,
    @InjectModel(SuscribedEmail.name)
    private suscribedModel: Model<SuscribedEmailDocument>,
  ) {}
}
