import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken } from '@nestjs/mongoose';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let controller: HealthController;

  const mockConnection = {
    readyState: 1,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: getConnectionToken(),
          useValue: mockConnection,
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should return healthy database status', () => {
    const health = controller.checkHealth();
    expect(health.status).toBe('ok');
    expect(health.service).toBe('gomatric-backend');
    expect(health.database.status).toBe('connected');
    expect(health.database.healthy).toBe(true);
  });
});
