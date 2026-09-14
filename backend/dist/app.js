"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_config_1 = require("./swagger/swagger.config");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const department_routes_1 = __importDefault(require("./routes/department.routes"));
const employee_routes_1 = __importDefault(require("./routes/employee.routes"));
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
const app = (0, express_1.default)();
// Express security and body-parsing middlewares
app.use((0, helmet_1.default)({
    contentSecurityPolicy: false,
}));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// API Documentation UI Endpoint
app.get('/api-docs.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swagger_config_1.swaggerSpec);
});
const swaggerUiOptions = {
    swaggerOptions: {
        url: '/api-docs.json',
    },
    customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui.min.css',
    customJs: [
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-bundle.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-standalone-preset.min.js',
    ],
};
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_config_1.swaggerSpec, swaggerUiOptions));
// API Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/departments', department_routes_1.default);
app.use('/api/employees', employee_routes_1.default);
app.use('/api/dashboard', dashboard_routes_1.default);
// Health check endpoint
app.get('/health', (_req, res) => {
    res.status(200).json({
        status: 'OK',
        service: 'Employee Management API',
        timestamp: new Date().toISOString(),
    });
});
// Centralized error handling middleware
app.use((err, _req, res, _next) => {
    console.error('[Error Middleware]:', err);
    res.status(500).json({
        message: err.message || 'Internal Server Error',
    });
});
exports.default = app;
