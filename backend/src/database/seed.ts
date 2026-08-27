import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DatabaseSeederService } from './database-seeder.service';
import { Logger } from '@nestjs/common';

async function runSeed() {
  const logger = new Logger('SeedScript');
  logger.log('Starting standalone database seed...');

  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['log', 'error', 'warn'],
  });

  const seeder = app.get(DatabaseSeederService);
  await seeder.seedUsers();

  logger.log('Database seeding finished successfully!');
  await app.close();
  process.exit(0);
}

runSeed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});