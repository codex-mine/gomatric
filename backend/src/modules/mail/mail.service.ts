import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter | null = null;

  constructor(private readonly configService: ConfigService) {
    this.initTransporter();
  }

  private initTransporter() {
    const host = this.configService.get<string>('mail.host') || process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = this.configService.get<number>('mail.port') || parseInt(process.env.SMTP_PORT || '587', 10);
    const user = this.configService.get<string>('mail.username') || process.env.SMTP_USERNAME;
    const pass = this.configService.get<string>('mail.password') || process.env.SMTP_PASSWORD;

    if (!user || !pass) {
      this.logger.warn('SMTP credentials not fully provided. Mail service will log emails to console.');
      return;
    }

    try {
      this.transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465, // true for 465, false for other ports
        auth: {
          user,
          pass,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      this.logger.log(`Mail service initialized with SMTP host: ${host}:${port}`);
    } catch (err: any) {
      this.logger.error(`Failed to initialize SMTP transporter: ${err.message}`);
    }
  }

  async sendVerificationCode(to: string, name: string, code: string): Promise<boolean> {
    const fromName = this.configService.get<string>('mail.fromName') || 'GoMatric';
    const fromEmail = this.configService.get<string>('mail.fromEmail') || 'no-reply@gomatric.com';
    const subject = `${code} is your GoMatric Verification Code`;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 0; color: #1e293b; }
          .container { max-width: 560px; margin: 30px auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
          .header { background: #061474; padding: 28px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
          .content { padding: 32px 28px; }
          .greeting { font-size: 18px; font-weight: 600; color: #061474; margin-bottom: 12px; }
          .otp-box { margin: 28px 0; padding: 20px; background: #f1f5f9; border-radius: 10px; text-align: center; border: 1px dashed #cbd5e1; }
          .otp-code { font-size: 36px; font-weight: 800; color: #ED1B26; letter-spacing: 8px; font-family: monospace; }
          .expiry-text { font-size: 13px; color: #64748b; margin-top: 8px; }
          .footer { background: #f8fafc; padding: 20px 28px; font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>GoMatric Travel Concierge</h1>
          </div>
          <div class="content">
            <div class="greeting">Hello, ${name || 'Valued Traveler'}!</div>
            <p style="color: #475569; line-height: 1.6; margin-bottom: 20px;">
              Thank you for registering with GoMatric. Please use the 6-digit verification code below to verify your email address and activate your account.
            </p>
            <div class="otp-box">
              <div class="otp-code">${code}</div>
              <div class="expiry-text">This code will expire in <strong>10 minutes</strong>.</div>
            </div>
            <p style="color: #64748b; font-size: 13px; line-height: 1.5;">
              If you did not request this verification code, please disregard this email or contact our 24/7 concierge support immediately.
            </p>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} GoMatric Travel. All rights reserved. Global Travel & Visa Concierge.
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendMail(to, subject, html, `Your GoMatric verification code is: ${code}`);
  }

  async sendPasswordResetCode(to: string, name: string, code: string): Promise<boolean> {
    const fromName = this.configService.get<string>('mail.fromName') || 'GoMatric';
    const fromEmail = this.configService.get<string>('mail.fromEmail') || 'no-reply@gomatric.com';
    const subject = `${code} is your GoMatric Password Reset Code`;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 0; color: #1e293b; }
          .container { max-width: 560px; margin: 30px auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
          .header { background: #061474; padding: 28px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 24px; font-weight: 800; }
          .content { padding: 32px 28px; }
          .greeting { font-size: 18px; font-weight: 600; color: #061474; margin-bottom: 12px; }
          .otp-box { margin: 28px 0; padding: 20px; background: #fff1f2; border-radius: 10px; text-align: center; border: 1px dashed #fecdd3; }
          .otp-code { font-size: 36px; font-weight: 800; color: #ED1B26; letter-spacing: 8px; font-family: monospace; }
          .expiry-text { font-size: 13px; color: #64748b; margin-top: 8px; }
          .footer { background: #f8fafc; padding: 20px 28px; font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>GoMatric Travel Concierge</h1>
          </div>
          <div class="content">
            <div class="greeting">Hello, ${name || 'Valued Traveler'}</div>
            <p style="color: #475569; line-height: 1.6; margin-bottom: 20px;">
              We received a request to reset your GoMatric account password. Enter the 6-digit recovery code below to choose a new password:
            </p>
            <div class="otp-box">
              <div class="otp-code">${code}</div>
              <div class="expiry-text">This recovery code is valid for <strong>15 minutes</strong>.</div>
            </div>
            <p style="color: #64748b; font-size: 13px; line-height: 1.5;">
              If you did not initiate this password reset, please change your password immediately or contact our support team.
            </p>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} GoMatric Travel. All rights reserved.
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendMail(to, subject, html, `Your GoMatric password reset code is: ${code}`);
  }

  async sendAccountActivation(to: string, name: string): Promise<boolean> {
    const subject = `Welcome to GoMatric � Account Activated!`;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; margin: 0; padding: 0; color: #1e293b; }
          .container { max-width: 560px; margin: 30px auto; background: #fff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
          .header { background: #061474; padding: 24px; text-align: center; color: #fff; }
          .content { padding: 32px 28px; }
          .btn { display: inline-block; background: #ED1B26; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 16px; }
          .footer { background: #f8fafc; padding: 16px 28px; font-size: 12px; color: #94a3b8; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header"><h2>GoMatric</h2></div>
          <div class="content">
            <h3>Welcome aboard, ${name || 'Traveler'}!</h3>
            <p>Your GoMatric account is now fully verified and activated. You can now explore tour packages, track visa applications, and book journeys worldwide.</p>
          </div>
          <div class="footer">&copy; ${new Date().getFullYear()} GoMatric Travel</div>
        </div>
      </body>
      </html>
    `;

    return this.sendMail(to, subject, html, `Your GoMatric account is now active!`);
  }

  private async sendMail(to: string, subject: string, html: string, textFallback?: string): Promise<boolean> {
    const fromName = this.configService.get<string>('mail.fromName') || 'GoMatric';
    const fromEmail = this.configService.get<string>('mail.fromEmail') || 'salespilot.ai1@gmail.com';
    const from = `"${fromName}" <${fromEmail}>`;

    if (!this.transporter) {
      this.logger.log(`[SIMULATED EMAIL] To: ${to} | Subject: ${subject} | Content: ${textFallback || subject}`);
      return true;
    }

    try {
      const info = await this.transporter.sendMail({
        from,
        to,
        subject,
        text: textFallback,
        html,
      });
      this.logger.log(`Email successfully sent to ${to} (MessageId: ${info.messageId})`);
      return true;
    } catch (error: any) {
      this.logger.error(`Error sending email to ${to}: ${error.message}`, error.stack);
      return false;
    }
  }
}
