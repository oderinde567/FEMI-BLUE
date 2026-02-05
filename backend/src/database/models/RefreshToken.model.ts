import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IRefreshToken extends Document {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    tokenHash: string;
    deviceInfo?: string;
    ipAddress?: string;
    expiresAt: Date;
    revokedAt?: Date;
    createdAt: Date;
}

const refreshTokenSchema = new Schema<IRefreshToken>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        tokenHash: {
            type: String,
            required: true,
            unique: true,
        },
        deviceInfo: {
            type: String,
        },
        ipAddress: {
            type: String,
        },
        expiresAt: {
            type: Date,
            required: true,
        },
        revokedAt: {
            type: Date,
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
    }
);

// Indexes (tokenHash index created automatically by unique: true)
refreshTokenSchema.index({ userId: 1 });
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index

export const RefreshToken: Model<IRefreshToken> = mongoose.model<IRefreshToken>(
    'RefreshToken',
    refreshTokenSchema
);
