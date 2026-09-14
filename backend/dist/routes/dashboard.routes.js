"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_controller_1 = require("../controllers/dashboard.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// Protect dashboard routes with JWT Authentication
router.use(auth_middleware_1.authenticate);
// Analytics endpoints
router.get('/stats', (req, res) => dashboard_controller_1.dashboardController.getStats(req, res));
exports.default = router;
