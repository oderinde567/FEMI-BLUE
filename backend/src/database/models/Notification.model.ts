import mongoose, { Schema, Document, Model } from 'mongoose';

export interface INotification extends Document {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    type: string;
    title: string;
    message: string;
    data?: Record<string, unknown>;
    readAt?: Date;
    channels: string[];
    createdAt: Date;
}

const notificationSchema = new Schema<INotification>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            maxlength: 200,
        },
        message: {
            type: String,
            required: true,
            maxlength: 1000,
        },
        data: {
            type: Object,
            default: {},
        },
        readAt: {
            type: Date,
        },
        channels: {
            type: [String],
            default: ['in_app'],
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
    }
);

// Indexes
notificationSchema.index({ userId: 1, createdAt: -1 });
notificationSchema.index({ userId: 1, readAt: 1 });

export const Notification: Model<INotification> = mongoose.model<INotification>(
    'Notification',
    notificationSchema
);
