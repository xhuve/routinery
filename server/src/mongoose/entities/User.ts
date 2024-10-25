import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type WorkoutDocument = User & Document;

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

	@Prop({ type: [{ type: Types.ObjectId, ref: 'Workout' }] })
	workoutHistory: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
