"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const env_1 = require("./env");
// TypeORM DataSource configuration for MySQL database connection
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: env_1.config.db.host,
    port: env_1.config.db.port,
    username: env_1.config.db.user,
    password: env_1.config.db.password,
    database: env_1.config.db.name,
    synchronize: false, // Schema migrations handle structural changes in production
    logging: env_1.config.nodeEnv === 'development',
    entities: [__dirname + '/../entities/*.{ts,js}'],
    migrations: [__dirname + '/../migrations/*.{ts,js}'],
    subscribers: [],
});
