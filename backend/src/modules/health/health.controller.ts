import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Public } from '../../common/decorators';

@ApiTags('Health Check')
@Controller()
export class HealthController {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  @Public()
  @Get('health')
  @ApiOperation({ summary: 'Application and database health check' })
  @ApiResponse({ status: 200, description: 'System health status' })
  checkHealth() {
    const stateMap: Record<number, string> = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
    };

    const dbState = stateMap[this.connection.readyState] || 'unknown';
    const isDbHealthy = this.connection.readyState === 1;

    return {
      status: isDbHealthy ? 'ok' : 'degraded',
      service: 'gomatric-backend',
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
      database: {
        status: dbState,
        healthy: isDbHealthy,
      },
      memory: {
        heapUsed: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`,
        rss: `${Math.round(process.memoryUsage().rss / 1024 / 1024)} MB`,
      },
    };
  }
}
