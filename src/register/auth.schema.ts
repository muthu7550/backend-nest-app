import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type registerUserDocument = HydratedDocument<Register>;

@Schema({ timestamps: true })
export class Register {

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;
  
  @Prop({ required: true })
  role!: string;
  
  @Prop({ required: false })
  refreshToken?: string; 
}

export const UserSchema = SchemaFactory.createForClass(Register);
