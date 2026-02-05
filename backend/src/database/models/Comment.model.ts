import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IComment extends Document {
    _id: mongoose.Types.ObjectId;
    requestId: mongoose.Types.ObjectId;
    authorId: mongoose.Types.ObjectId;
    content: string;
    isInternal: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const commentSchema = new Schema<IComment>(
    {
        requestId: {
            type: Schema.Types.ObjectId,
            ref: 'Request',
            required: true,
        },
        authorId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        content: {
            type: String,
            required: [true, 'Comment content is required'],
            trim: true,
            maxlength: 5000,
        },
        isInternal: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Indexes
commentSchema.index({ requestId: 1, createdAt: -1 });

export const Comment: Model<IComment> = mongoose.model<IComment>('Comment', commentSchema);
