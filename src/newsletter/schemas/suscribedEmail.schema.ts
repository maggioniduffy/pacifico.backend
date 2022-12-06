import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';
import { Document } from 'mongoose';

export type SuscribedEmailDocument = SuscribedEmail & Document;

@Schema()
export class SuscribedEmail {
  @Prop({ required: true })
  @IsEmail()
  email: string;
}

export const SuscribedEmailSchema =
  SchemaFactory.createForClass(SuscribedEmail);
