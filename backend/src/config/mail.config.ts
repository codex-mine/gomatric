import { registerAs } from '@nestjs/config';

export const mailConfig = registerAs('mail', () => ({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  username: process.env.SMTP_USERNAME || '',
  password: process.env.SMTP_PASSWORD || '',
  useTls: process.env.SMTP_USE_TLS !== 'false',
  fromEmail: process.env.SMTP_FROM_EMAIL || 'salespilot.ai1@gmail.com',
  fromName: process.env.SMTP_FROM_NAME || 'GoMatric',
}));
