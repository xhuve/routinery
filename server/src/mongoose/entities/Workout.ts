import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type WorkoutDocument = Workout & Document;

@Schema({ timestamps: true })
export class Workout {
	@Prop({ required: true })
	name: string;

	@Prop({ required: true })
	length: number;

	@Prop({ type: [{ type: Types.ObjectId, ref: 'Exercise' }] })
	exercises: Types.ObjectId[];

	@Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }] })
	comments: Types.ObjectId[];
}

export const WorkoutSchema = SchemaFactory.createForClass(Workout);
