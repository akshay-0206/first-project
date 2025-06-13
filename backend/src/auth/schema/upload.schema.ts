import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export type UploadDocument = Upload & Document;

@Schema({ timestamps: true })
export class Upload {
  @Prop()
  filename: string;

  @Prop()
  path: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Auth', required: true })
  userId: MongooseSchema.Types.ObjectId;

}

export const UploadSchema = SchemaFactory.createForClass(Upload);
