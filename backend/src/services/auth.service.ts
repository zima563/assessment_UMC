import { AppDataSource } from '../config/data-source';
import { User, UserRole } from '../entities/User';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';
import { LoginDtoType, RegisterUserDtoType } from '../dtos/auth.dto';

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  // Authenticate user credentials and return JWT token with user metadata
  async login(data: LoginDtoType) {
    const user = await this.userRepository.findOne({
      where: { username: data.username },
    });

    if (!user) {
      throw new Error('Invalid username or password');
    }

    const isPasswordValid = await comparePassword(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid username or password');
    }

    const token = generateToken({
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
  async register(data: RegisterUserDtoType) {
    const existingUser = await this.userRepository.findOne({
      where: { username: data.username },
    });

    if (existingUser) {
      throw new Error('Username is already taken');
    }

    const hashedPassword = await hashPassword(data.password);
    const user = this.userRepository.create({
      username: data.username,
      password: hashedPassword,
      role: data.role || UserRole.USER,
    });

    await this.userRepository.save(user);

    const token = generateToken({
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

export const authService = new AuthService();
