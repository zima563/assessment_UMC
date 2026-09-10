import { DataSource } from 'typeorm';
import { config } from './env';

// TypeORM DataSource configuration for MySQL database connection
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: config.db.host,
  port: config.db.port,
  username: config.db.user,
  password: config.db.password,
  database: config.db.name,
  synchronize: false, // Schema migrations handle structural changes in production
  logging: config.nodeEnv === 'development',
  entities: [__dirname + '/../entities/*.{ts,js}'],
  migrations: [__dirname + '/../migrations/*.{ts,js}'],
  subscribers: [],
});
