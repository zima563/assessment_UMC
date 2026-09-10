import 'reflect-metadata';
import app from './app';
import { AppDataSource } from './config/data-source';
import { config } from './config/env';

// Initialize Database connection then start Express server
async function bootstrap() {
  try {
    console.log('Connecting to MySQL database via TypeORM...');
    await AppDataSource.initialize();
    console.log('Database connection established successfully.');

    app.listen(config.port, () => {
      console.log(`Backend server running on http://localhost:${config.port} in ${config.nodeEnv} mode`);
    });
  } catch (error) {
    console.error('Fatal error during database connection initialization:', error);
    process.exit(1);
  }
}

bootstrap();
