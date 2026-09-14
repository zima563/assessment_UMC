"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
const data_source_1 = require("../config/data-source");
const User_1 = require("../entities/User");
const password_1 = require("../utils/password");
const jwt_1 = require("../utils/jwt");
class AuthService {
    userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    // Authenticate user credentials and return JWT token with user metadata
    async login(data) {
        const user = await this.userRepository.findOne({
            where: { username: data.username },
        });
        if (!user) {
            throw new Error('Invalid username or password');
        }
        const isPasswordValid = await (0, password_1.comparePassword)(data.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid username or password');
        }
        const token = (0, jwt_1.generateToken)({
            userId: user.id,
            username: user.username,
            role: user.role,
        });
        return {
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
            },
        };
    }
    // Register new user account with hashed password
    async register(data) {
        const existingUser = await this.userRepository.findOne({
            where: { username: data.username },
        });
        if (existingUser) {
            throw new Error('Username is already taken');
        }
        const hashedPassword = await (0, password_1.hashPassword)(data.password);
        const user = this.userRepository.create({
            username: data.username,
            password: hashedPassword,
            role: data.role || User_1.UserRole.USER,
        });
        await this.userRepository.save(user);
        const token = (0, jwt_1.generateToken)({
            userId: user.id,
            username: user.username,
            role: user.role,
        });
        return {
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
            },
        };
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();
