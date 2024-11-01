import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

export type ExerciseDocument = Exercise & Document;

@Schema()
export class Exercise {
	@Prop({ required: true })
	name: string;

	@Prop({ default: 'None' })
	type: string;

	@Prop({ default: null })
	length: number;

	@Prop({ type: [{ type: Types.ObjectId, ref: 'Workout' }] })
	workouts: Types.ObjectId[];
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
