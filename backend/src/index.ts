import 'reflect-metadata';
import app from './app';
import { AppDataSource } from './config/data-source';
import { config } from './config/env';

async function connectWithRetry(retries = 10, delayMs = 2000) {
  for (let i = 1; i <= retries; i++) {
    try {
      console.log(`Connecting to MySQL database via TypeORM (attempt ${i}/${retries})...`);
      await AppDataSource.initialize();
      console.log('Database connection established successfully.');
      return;
    } catch (err) {
      if (i === retries) throw err;
      console.log(`MySQL connection failed/refused. Retrying in ${delayMs / 1000}s...`);
      await new Promise((res) => setTimeout(res, delayMs));
    }
  }
}

// Initialize Database connection then start Express server
async function bootstrap() {
  try {
    await connectWithRetry();

    console.log('Running pending database migrations...');
    await AppDataSource.runMigrations();
    console.log('Migrations executed successfully.');

    app.listen(config.port, () => {
      console.log(`Backend server running on http://localhost:${config.port} in ${config.nodeEnv} mode`);
    });
  } catch (error) {
    console.error('Fatal error during database connection initialization:', error);
    process.exit(1);
  }
}

bootstrap();
