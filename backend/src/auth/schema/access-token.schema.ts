import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument,Schema as MongooseSchema} from 'mongoose';

@Schema({ timestamps: true })
export class AccessToken {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Auth', required: true })
  userId: string;

  @Prop({ required: true })
  token: string;
}

export type AccessTokenDocument = HydratedDocument<AccessToken>;
export const AccessTokenSchema = SchemaFactory.createForClass(AccessToken);
