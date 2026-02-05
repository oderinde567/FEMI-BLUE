import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IRequest extends Document {
    _id: mongoose.Types.ObjectId;
    referenceNumber: string;
    title: string;
    description: string;
    category: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    status: 'pending' | 'in_progress' | 'completed' | 'cancelled' | 'overdue';
    requesterId: mongoose.Types.ObjectId;
    assignedTo?: mongoose.Types.ObjectId;
    dueDate?: Date;
    completedAt?: Date;
    valueNgn?: number;
    metadata?: Record<string, unknown>;
    createdAt: Date;
    updatedAt: Date;
}

const requestSchema = new Schema<IRequest>(
    {
        referenceNumber: {
            type: String,
            required: true,
            unique: true,
        },
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            maxlength: 200,
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            trim: true,
            maxlength: 5000,
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            trim: true,
        },
        priority: {
            type: String,
            enum: ['low', 'medium', 'high', 'urgent'],
            default: 'medium',
        },
        status: {
            type: String,
            enum: ['pending', 'in_progress', 'completed', 'cancelled', 'overdue'],
            default: 'pending',
        },
        requesterId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        assignedTo: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        dueDate: {
            type: Date,
        },
        completedAt: {
            type: Date,
        },
        valueNgn: {
            type: Number,
            min: 0,
        },
        metadata: {
            type: Object,
            default: {},
        },
    },
    {
        timestamps: true,
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
requestSchema.index({ referenceNumber: 1 });
requestSchema.index({ requesterId: 1 });
requestSchema.index({ assignedTo: 1 });
requestSchema.index({ status: 1 });
requestSchema.index({ priority: 1 });
requestSchema.index({ category: 1 });
requestSchema.index({ createdAt: -1 });

export const Request: Model<IRequest> = mongoose.model<IRequest>('Request', requestSchema);
