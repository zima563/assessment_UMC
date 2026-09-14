"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_1 = __importDefault(require("./app"));
const data_source_1 = require("./config/data-source");
const env_1 = require("./config/env");
async function connectWithRetry(retries = 10, delayMs = 2000) {
    for (let i = 1; i <= retries; i++) {
        try {
            console.log(`Connecting to MySQL database via TypeORM (attempt ${i}/${retries})...`);
            await data_source_1.AppDataSource.initialize();
            console.log('Database connection established successfully.');
            return;
        }
        catch (err) {
            if (i === retries)
                throw err;
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
        await data_source_1.AppDataSource.runMigrations();
        console.log('Migrations executed successfully.');
        app_1.default.listen(env_1.config.port, () => {
            console.log(`Backend server running on http://localhost:${env_1.config.port} in ${env_1.config.nodeEnv} mode`);
        });
    }
    catch (error) {
        console.error('Fatal error during database connection initialization:', error);
        process.exit(1);
    }
}
bootstrap();
