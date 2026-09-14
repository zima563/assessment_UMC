"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
// Generate JWT signed token with user payload
function generateToken(payload) {
    const options = {
        expiresIn: env_1.config.jwt.expiresIn,
    };
    return jsonwebtoken_1.default.sign(payload, env_1.config.jwt.secret, options);
}
// Verify JWT token signature and return decoded payload
function verifyToken(token) {
    return jsonwebtoken_1.default.verify(token, env_1.config.jwt.secret);
}
