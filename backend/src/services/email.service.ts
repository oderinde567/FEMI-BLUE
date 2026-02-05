import { env } from '../config/env.js';

interface EmailOptions {
    to: string | string[];
    subject: string;
    htmlContent: string;
    textContent?: string;
}

interface BrevoResponse {
    messageId: string;
}

class EmailService {
    private baseUrl = 'https://api.brevo.com/v3';

    private async sendRequest<T>(endpoint: string, body: unknown): Promise<T> {
        if (!env.BREVO_API_KEY) {
            console.log('📧 Email (simulated):', JSON.stringify(body, null, 2));
            return { messageId: 'simulated-' + Date.now() } as T;
        }

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'api-key': env.BREVO_API_KEY,
                'content-type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const error = await response.text();
            console.error('❌ Brevo API error:', error);
            throw new Error(`Email send failed: ${response.status}`);
        }

        return response.json() as Promise<T>;
    }

    async sendEmail(options: EmailOptions): Promise<BrevoResponse> {
        const recipients = Array.isArray(options.to) ? options.to : [options.to];

        return this.sendRequest<BrevoResponse>('/smtp/email', {
            sender: { email: env.EMAIL_FROM, name: 'BlueArnk' },
            to: recipients.map((email) => ({ email })),
            subject: options.subject,
            htmlContent: options.htmlContent,
            textContent: options.textContent,
        });
    }

    // Pre-built email templates
    async sendVerificationEmail(email: string, otp: string, magicLink: string): Promise<void> {
        await this.sendEmail({
            to: email,
            subject: 'Verify Your Email - BlueArnk',
            htmlContent: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2563eb;">Welcome to BlueArnk!</h2>
                    <p>Please verify your email address to get started.</p>
                    
                    <h3>Option 1: Enter this code</h3>
                    <div style="background: #f3f4f6; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 8px; margin: 20px 0;">
                        ${otp}
                    </div>
                    
                    <h3>Option 2: Click the link</h3>
                    <p><a href="${magicLink}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Verify Email</a></p>
                    
                    <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                        This code expires in 15 minutes. If you didn't create an account, please ignore this email.
                    </p>
                </div>
            `,
        });
    }

    async sendPasswordResetEmail(email: string, resetLink: string): Promise<void> {
        await this.sendEmail({
            to: email,
            subject: 'Reset Your Password - BlueArnk',
            htmlContent: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2563eb;">Password Reset Request</h2>
                    <p>We received a request to reset your password. Click the button below to create a new password:</p>
                    
                    <p style="text-align: center; margin: 30px 0;">
                        <a href="${resetLink}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Reset Password</a>
                    </p>
                    
                    <p style="color: #6b7280; font-size: 14px;">
                        This link expires in 1 hour. If you didn't request a password reset, please ignore this email.
                    </p>
                </div>
            `,
        });
    }

    async sendRequestCreatedEmail(
        email: string,
        data: { referenceNumber: string; title: string; requesterName: string }
    ): Promise<void> {
        await this.sendEmail({
            to: email,
            subject: `New Request: ${data.referenceNumber} - ${data.title}`,
            htmlContent: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2563eb;">New Request Created</h2>
                    
                    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Reference:</strong></td>
                            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${data.referenceNumber}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Title:</strong></td>
                            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${data.title}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Created by:</strong></td>
                            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${data.requesterName}</td>
                        </tr>
                    </table>
                    
                    <p><a href="${env.FRONTEND_URL}/requests" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View Request</a></p>
                </div>
            `,
        });
    }

    async sendRequestStatusChangedEmail(
        email: string,
        data: { referenceNumber: string; title: string; oldStatus: string; newStatus: string }
    ): Promise<void> {
        const statusColors: Record<string, string> = {
            pending: '#f59e0b',
            in_progress: '#3b82f6',
            completed: '#10b981',
            cancelled: '#ef4444',
            overdue: '#dc2626',
        };

        await this.sendEmail({
            to: email,
            subject: `Request ${data.referenceNumber} Status Updated`,
            htmlContent: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2563eb;">Request Status Updated</h2>
                    
                    <p>Your request <strong>${data.referenceNumber}</strong> has been updated:</p>
                    
                    <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p style="margin: 0;">
                            <span style="color: ${statusColors[data.oldStatus] || '#6b7280'}; text-decoration: line-through;">${data.oldStatus.replace('_', ' ').toUpperCase()}</span>
                            → 
                            <span style="color: ${statusColors[data.newStatus] || '#6b7280'}; font-weight: bold;">${data.newStatus.replace('_', ' ').toUpperCase()}</span>
                        </p>
                    </div>
                    
                    <p><strong>Request:</strong> ${data.title}</p>
                    
                    <p><a href="${env.FRONTEND_URL}/requests" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View Request</a></p>
                </div>
            `,
        });
    }

    async sendRequestAssignedEmail(
        email: string,
        data: { referenceNumber: string; title: string; assigneeName: string }
    ): Promise<void> {
        await this.sendEmail({
            to: email,
            subject: `You've been assigned: ${data.referenceNumber}`,
            htmlContent: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2563eb;">Request Assigned to You</h2>
                    
                    <p>Hi ${data.assigneeName},</p>
                    <p>You have been assigned to handle the following request:</p>
                    
                    <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p style="margin: 0;"><strong>Reference:</strong> ${data.referenceNumber}</p>
                        <p style="margin: 10px 0 0;"><strong>Title:</strong> ${data.title}</p>
                    </div>
                    
                    <p><a href="${env.FRONTEND_URL}/requests" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View Request</a></p>
                </div>
            `,
        });
    }
}

export const emailService = new EmailService();
