import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { appConfig, authConfig, databaseConfig, mailConfig, throttlerConfig, validateConfig } from './config';
import { DatabaseModule } from './database/database.module';

// Common Providers & Guards
import {
  AllExceptionsFilter,
  JwtAuthGuard,
  LoggingInterceptor,
  PermissionsGuard,
  RolesGuard,
  ThrottlerBehindProxyGuard,
  TransformResponseInterceptor,
} from './common';
import { CorrelationIdMiddleware } from './common/middleware/correlation-id.middleware';

// Feature Modules
import { AuditLogsModule } from './modules/audit-logs/audit-logs.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { CustomersModule } from './modules/customers/customers.module';
import { ServicesModule } from './modules/services/services.module';
import { DestinationsModule } from './modules/destinations/destinations.module';
import { VisasModule } from './modules/visas/visas.module';
import { ToursModule } from './modules/tours/tours.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { LeadsModule } from './modules/leads/leads.module';
import { QuotationsModule } from './modules/quotations/quotations.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, authConfig, databaseConfig, mailConfig, throttlerConfig],
      validate: validateConfig,
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          ttl: (configService.get<number>('throttler.ttl') || 60) * 1000,
          limit: configService.get<number>('throttler.limit') || 100,
        },
      ],
    }),
    DatabaseModule,
    AuditLogsModule,
    UsersModule,
    AuthModule,
    CustomersModule,
    ServicesModule,
    DestinationsModule,
    VisasModule,
    ToursModule,
    BookingsModule,
    LeadsModule,
    QuotationsModule,
    PaymentsModule,
    DocumentsModule,
    NotificationsModule,
    HealthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
