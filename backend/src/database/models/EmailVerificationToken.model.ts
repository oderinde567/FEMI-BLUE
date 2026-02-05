import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEmailVerificationToken extends Document {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    token: string;
    otp: string;
    expiresAt: Date;
    usedAt?: Date;
    createdAt: Date;
}

const emailVerificationTokenSchema = new Schema<IEmailVerificationToken>(
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
        otp: {
            type: String,
            required: true,
            length: 6,
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

// Indexes
emailVerificationTokenSchema.index({ userId: 1 });
emailVerificationTokenSchema.index({ token: 1 });
emailVerificationTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index

export const EmailVerificationToken: Model<IEmailVerificationToken> = mongoose.model<IEmailVerificationToken>(
    'EmailVerificationToken',
    emailVerificationTokenSchema
);
