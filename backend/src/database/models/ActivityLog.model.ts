import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IActivityLog extends Document {
    _id: mongoose.Types.ObjectId;
    actorId?: mongoose.Types.ObjectId;
    action: string;
    entityType?: string;
    entityId?: mongoose.Types.ObjectId;
    description: string;
    metadata?: Record<string, unknown>;
    ipAddress?: string;
    userAgent?: string;
    createdAt: Date;
}

const activityLogSchema = new Schema<IActivityLog>(
    {
        actorId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        action: {
            type: String,
            required: true,
        },
        entityType: {
            type: String,
        },
        entityId: {
            type: Schema.Types.ObjectId,
        },
        description: {
            type: String,
            required: true,
            maxlength: 500,
        },
        metadata: {
            type: Object,
            default: {},
        },
        ipAddress: {
            type: String,
        },
        userAgent: {
            type: String,
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
        toJSON: {
            virtuals: true,
            transform(_doc, ret) {
                const { __v, ...rest } = ret;
                return rest;
            },
        },
    }
);

// Indexes
activityLogSchema.index({ actorId: 1, createdAt: -1 });
activityLogSchema.index({ entityType: 1, entityId: 1 });
activityLogSchema.index({ createdAt: -1 });

export const ActivityLog: Model<IActivityLog> = mongoose.model<IActivityLog>(
    'ActivityLog',
    activityLogSchema
);
