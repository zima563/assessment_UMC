"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// Authentication Endpoints
router.post('/login', (req, res, next) => auth_controller_1.authController.login(req, res, next));
router.post('/register', (req, res, next) => auth_controller_1.authController.register(req, res, next));
// Protected current user profile endpoint
router.get('/me', auth_middleware_1.authenticate, (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    });
});
exports.default = router;
