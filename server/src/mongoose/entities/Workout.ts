import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type WorkoutDocument = Workout & Document;

export enum STATUS {
	PENDING = 'Pending',
	COMPLETED = 'Completed',
	CANCELLED = 'Cancelled',
}

@Schema({ timestamps: true })
export class Workout {
	@Prop({ required: true })
	name: string;

	@Prop({ required: true })
	durationInMinutes: number;

	@Prop({
		type: Types.ObjectId,
		ref: 'User',
		required: false,
		default: null,
	})
	creator: Types.ObjectId | null;

	@Prop({ required: false })
	startTime: Date;

	@Prop({ default: STATUS.PENDING })
	status: STATUS;

	@Prop({ type: [{ type: Types.ObjectId, ref: 'Exercise' }] })
	exercises: Types.ObjectId[];

	@Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }] })
	comments: Types.ObjectId[];
}

export const WorkoutSchema = SchemaFactory.createForClass(Workout);
