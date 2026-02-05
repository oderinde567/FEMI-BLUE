import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPasswordResetToken extends Document {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    token: string;
    expiresAt: Date;
    usedAt?: Date;
    createdAt: Date;
}

const passwordResetTokenSchema = new Schema<IPasswordResetToken>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        token: {
            type: String,
            required: true,
            unique: true,
        },
        expiresAt: {
            type: Date,
            required: true,
        },
        usedAt: {
            type: Date,
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
    }
);

// Indexes (token index created automatically by unique: true)
passwordResetTokenSchema.index({ userId: 1 });
passwordResetTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index

export const PasswordResetToken: Model<IPasswordResetToken> = mongoose.model<IPasswordResetToken>(
    'PasswordResetToken',
    passwordResetTokenSchema
);
