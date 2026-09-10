import 'reflect-metadata';
import { AppDataSource } from '../config/data-source';
import { User, UserRole } from '../entities/User';
import { Department } from '../entities/Department';
import { Employee } from '../entities/Employee';
import { hashPassword } from '../utils/password';

async function seed() {
  try {
    console.log('Connecting to database for seeding...');
    await AppDataSource.initialize();
    await AppDataSource.runMigrations();

    const userRepository = AppDataSource.getRepository(User);
    const departmentRepository = AppDataSource.getRepository(Department);
    const employeeRepository = AppDataSource.getRepository(Employee);

    // 1. Seed Admin & User Accounts
    console.log('Seeding initial users...');
    const adminPassword = await hashPassword('admin123');
    const userPassword = await hashPassword('user123');

    let admin = await userRepository.findOne({ where: { username: 'admin' } });
    if (!admin) {
      admin = userRepository.create({
        username: 'admin',
        password: adminPassword,
        role: UserRole.ADMIN,
      });
      await userRepository.save(admin);
      console.log('-> Created Admin account (username: admin, password: admin123)');
    }

    let regularUser = await userRepository.findOne({ where: { username: 'user' } });
    if (!regularUser) {
      regularUser = userRepository.create({
        username: 'user',
        password: userPassword,
        role: UserRole.USER,
      });
      await userRepository.save(regularUser);
      console.log('-> Created Standard User account (username: user, password: user123)');
    }

    // 2. Seed Initial Departments
    console.log('Seeding departments...');
    const deptNames = ['Engineering', 'Human Resources', 'Marketing', 'Finance'];
    const departments: Department[] = [];

    for (const name of deptNames) {
      let dept = await departmentRepository.findOne({ where: { name } });
      if (!dept) {
        dept = departmentRepository.create({ name });
        dept = await departmentRepository.save(dept);
        console.log(`-> Created Department: ${name}`);
      }
      departments.push(dept);
    }

    // 3. Seed Initial Employees
    console.log('Seeding employees...');
    const count = await employeeRepository.count();
    if (count === 0) {
      const dummyEmployees = [
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          hireDate: new Date('2024-01-15'),
          salary: 85000.0,
          departmentId: departments[0]?.id,
        },
        {
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          hireDate: new Date('2024-03-01'),
          salary: 72000.0,
          departmentId: departments[1]?.id,
        },
        {
          firstName: 'Michael',
          lastName: 'Johnson',
          email: 'michael.j@example.com',
          hireDate: new Date('2024-05-10'),
          salary: 68000.0,
          departmentId: departments[2]?.id,
        },
        {
          firstName: 'Emily',
          lastName: 'Davis',
          email: 'emily.davis@example.com',
          hireDate: new Date('2024-06-20'),
          salary: 95000.0,
          departmentId: departments[0]?.id,
        },
      ];

      for (const empData of dummyEmployees) {
        const emp = employeeRepository.create(empData);
        await employeeRepository.save(emp);
      }
      console.log('-> Seeded initial 4 dummy employees');
    }

    console.log('✅ Database Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  }
}

seed();
