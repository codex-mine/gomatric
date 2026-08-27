import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponseDto } from '../dto/api-response.dto';

@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor<T, ApiResponseDto<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponseDto<T>> {
    return next.handle().pipe(
      map((response) => {
        // If response already matches standard structure, return it
        if (
          response &&
          typeof response === 'object' &&
          'success' in response &&
          'message' in response
        ) {
          return response;
        }

        // If response has { data, meta } structure from pagination
        if (response && typeof response === 'object' && 'data' in response && 'meta' in response) {
          return {
            success: true,
            message: 'Request successful',
            data: response.data,
            meta: response.meta,
            timestamp: new Date().toISOString(),
          };
        }

        // Standard payload wrapping
        return {
          success: true,
          message: 'Request successful',
          data: response ?? null,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
