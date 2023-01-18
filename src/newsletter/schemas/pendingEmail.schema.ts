import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';
import { Document } from 'mongoose';

export type PendingEmailDocument = PendingEmail & Document;

@Schema()
export class PendingEmail {
  @Prop({ required: true, unique: true })
  @IsEmail()
  email: string;

  @Prop({ required: true })
  timestamp: number;

  @Prop({ required: true })
  token: string;
}

export const PendingEmailSchema = SchemaFactory.createForClass(PendingEmail);
