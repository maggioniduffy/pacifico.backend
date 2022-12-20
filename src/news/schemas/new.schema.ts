import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document, ObjectId } from 'mongoose';

export type NewDocument = New & Document;

@Schema()
export class New {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  subtitle: string;

  @Prop({ required: true })
  body: string;

  @Prop({ required: true })
  imageName: string;

  @Prop({ required: true })
  imageDesc: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true, default: Date.now() })
  time: Date;
}

const NewSchema = SchemaFactory.createForClass(New);

NewSchema.index({ title: 'text' });

export { NewSchema };
