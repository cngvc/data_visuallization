import { config } from '@/config';
import nodemailer from 'nodemailer';

class EmailService {
  private transporter: nodemailer.Transporter;
  private fromEmail: string;
  private appUrl: string;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      secure: config.SMTP_SECURE,
      auth: {
        user: config.SMTP_USER,
        pass: config.SMTP_PASS
      }
    });
    this.fromEmail = `${config.FROM_EMAIL}`;
    this.appUrl = `${config.APP_URL}`;
  }

  async sendPasswordResetEmail(email: string, token: string): Promise<{ success: boolean; resetLink: string }> {
    const resetLink = `${this.appUrl}/reset-password?token=${token}`;
    try {
      const content = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Password Reset Request</h2>
            <p>We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
            <p>To reset your password, click the button below:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">Reset Password</a>
            </div>
            <p>Or copy and paste this link into your browser:</p>
            <p><a href="${resetLink}">${resetLink}</a></p>
            <p>This link will expire in 24 hours.</p>
            <p>If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
          </div>
        `;
      const info = await this.transporter.sendMail({
        from: this.fromEmail,
        to: email,
        subject: 'Reset Your Password',
        html: content
      });

      return {
        success: !!info.messageId,
        resetLink
      };
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }
  }

  async sendWelcomeEmail(params: {
    to: string;
    name: string;
    email: string;
    password: string;
    organizationName: string;
  }): Promise<{ success: boolean }> {
    try {
      const { to, name, email, password, organizationName } = params;

      const content = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6;">
          <h2>Welcome to ${organizationName}!</h2>
          <p>Hello ${name},</p>
          <p>You have been invited to join ${organizationName} on our platform. Here are your login details:</p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 4px; margin: 20px 0;">
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Temporary Password:</strong> ${password}</p>
          </div>
          <p>For security reasons, we recommend that you change your password after logging in for the first time.</p>
          <p>If you did not expect this invitation, please ignore this email or contact support if you have any questions.</p>
          <p>Best regards,<br>The ${organizationName} Team</p>
        </div>
      `;

      const info = await this.transporter.sendMail({
        from: this.fromEmail,
        to,
        subject: `Welcome to ${organizationName}!`,
        html: content
      });

      return {
        success: !!info.messageId
      };
    } catch (error) {
      console.error('Error sending welcome email:', error);
      throw error;
    }
  }
}

export const emailService = new EmailService();
