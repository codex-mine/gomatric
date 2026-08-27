import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errors: any = undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const resObj = exceptionResponse as Record<string, any>;
        message = resObj.message || exception.message;
        if (Array.isArray(resObj.message)) {
          errors = resObj.message;
          message = 'Validation failed';
        }
      }
    } else if (exception instanceof Error) {
      // MongoDB duplicate key error (code 11000)
      if ((exception as any).code === 11000) {
        status = HttpStatus.CONFLICT;
        const keyPattern = (exception as any).keyPattern || {};
        const field = Object.keys(keyPattern)[0] || 'field';
        message = `A record with this ${field} already exists.`;
      } else if (exception.name === 'ValidationError') {
        status = HttpStatus.BAD_REQUEST;
        message = exception.message;
      } else if (exception.name === 'CastError') {
        status = HttpStatus.BAD_REQUEST;
        message = `Invalid ID format: ${(exception as any).value}`;
      } else {
        this.logger.error(
          `Unhandled Exception at ${request.method} ${request.url}: ${exception.message}`,
          exception.stack,
        );
      }
    }

    const isProduction = process.env.NODE_ENV === 'production';

    response.status(status).json({
      success: false,
      statusCode: status,
      message,
      ...(errors ? { errors } : {}),
      path: request.url,
      timestamp: new Date().toISOString(),
      ...(!isProduction && exception instanceof Error ? { stack: exception.stack } : {}),
    });
  }
}
