import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port') || 5000;
  const apiPrefix = configService.get<string>('app.apiPrefix') || 'api/v1';
  const corsOrigin = configService.get<string>('app.corsOrigin') || '*';
  const nodeEnv = configService.get<string>('app.nodeEnv') || 'development';
  const swaggerEnabled = configService.get<boolean>('app.swaggerEnabled');

  // Security Headers & Cookies
  app.use(helmet());
  app.use(cookieParser());

  // CORS Configuration
  const allowedOrigins =
    corsOrigin === '*'
      ? '*'
      : corsOrigin.includes(',')
        ? corsOrigin.split(',').map((origin) => origin.trim())
        : corsOrigin;

  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization, X-Correlation-ID',
  });

  // Global API Prefix (excluding /health)
  app.setGlobalPrefix(apiPrefix, {
    exclude: ['health'],
  });

  // Global Request Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger Documentation Setup
  if (swaggerEnabled || nodeEnv !== 'production') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('GoMatric API')
      .setDescription(
        'GoMatric Travel Agency Platform Backend API — Visa Services, Tour Packages, Bookings, Leads & CRM, Payments, Document Verification, and Agency Management.',
      )
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT Access Token',
          in: 'header',
        },
        'JWT-auth',
      )
      .addTag(
        'Authentication',
        'User authentication, registration, token refresh, and password management',
      )
      .addTag('Users', 'User accounts, role assignment, and profile management')
      .addTag('Customers', 'Customer records and CRM profiles')
      .addTag('Services', 'Travel agency services catalog (Visa, Tours, Flights, Hotels, etc.)')
      .addTag('Destinations', 'Popular and featured travel destinations')
      .addTag(
        'Visa Applications',
        'Visa processing, application submission, status tracking, and document links',
      )
      .addTag('Tour Packages', 'Curated tour packages, itineraries, and pricing')
      .addTag('Leads & Inquiries', 'Customer leads, inquiries, and follow-ups')
      .addTag('Quotations', 'Custom quotation generation and tracking')
      .addTag('Bookings', 'Confirmed bookings, status progression, and customer assignments')
      .addTag('Payments', 'Manual and gateway payment records and receipts')
      .addTag('Documents', 'Secure document uploads, classification, and verification')
      .addTag('Notifications', 'In-app notifications and event alerts')
      .addTag('Audit Logs', 'Security and activity audit trails')
      .addTag('Health Check', 'Service and database liveness checks')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
      customSiteTitle: 'GoMatric API Documentation',
    });
  }

  await app.listen(port);

  logger.log(`====================================================`);
  logger.log(`  GoMatric Backend is running!                     `);
  logger.log(`  Environment : ${nodeEnv}                         `);
  logger.log(`  API Base URL: http://localhost:${port}/${apiPrefix}`);
  logger.log(`  Health Check: http://localhost:${port}/health    `);
  if (swaggerEnabled || nodeEnv !== 'production') {
    logger.log(`  Swagger Docs: http://localhost:${port}/api/docs  `);
  }
  logger.log(`====================================================`);
}

bootstrap();
