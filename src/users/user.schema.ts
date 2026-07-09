import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {

  @Prop({ required: true })
  fullName!: string;

  @Prop({ required: true, unique: true })
  email!: string;
  
  @Prop({ required: true, unique: true })
  phone!: number;

  @Prop({ required: true })
  role!: string;

  @Prop({ required: true })
  status!: string;

  @Prop({ required: true })
  address!: string;

  @Prop({ required: false })
  blocked!: boolean;

  @Prop({ required: false })
  avatar!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
