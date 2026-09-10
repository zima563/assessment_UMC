import bcrypt from 'bcryptjs';

// Hash raw password with bcrypt salt
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Compare raw password against hashed password
export async function comparePassword(raw: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(raw, hashed);
}
