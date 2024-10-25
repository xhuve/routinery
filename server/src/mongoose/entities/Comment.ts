import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type CommentDocument = Comment & Document;
@Schema({ timestamps: true })
export class Comment {
	@Prop({ required: true })
	content: string;

	@Prop({ required: true })
	author: string;

	@Prop({ type: Types.ObjectId, ref: 'Workout', required: true })
	workout: Types.ObjectId;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
