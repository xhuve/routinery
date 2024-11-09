import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

export interface UserWithDates extends UserDocument {
	updatedAt: Date;
	createdAt: Date;
}

@Schema({ timestamps: true })
export class User {
	@Prop({ required: true })
	username: string;

	@Prop({ required: true })
	email: string;

	@Prop({ required: true })
	password: string;

	@Prop({ required: true })
	gender: string;

	@Prop({ required: true })
	profilePicture: string;

	@Prop({ default: 0 })
	activeStreak: number;

	@Prop({ type: [{ type: Types.ObjectId, ref: 'Workout' }] })
	myWorkouts: Types.ObjectId[];

	@Prop({ default: new Date(Date.now()) })
	lastLogin: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
