"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const data_source_1 = require("../config/data-source");
const User_1 = require("../entities/User");
const Department_1 = require("../entities/Department");
const Employee_1 = require("../entities/Employee");
const password_1 = require("../utils/password");
async function connectWithRetry(retries = 10, delayMs = 2000) {
    for (let i = 1; i <= retries; i++) {
        try {
            console.log(`Connecting to database for seeding (attempt ${i}/${retries})...`);
            await data_source_1.AppDataSource.initialize();
            console.log('Database connected successfully!');
            return;
        }
        catch (err) {
            if (i === retries)
                throw err;
            console.log(`Database connection refused/failed. Retrying in ${delayMs / 1000}s...`);
            await new Promise((res) => setTimeout(res, delayMs));
        }
    }
}
async function seed() {
    try {
        await connectWithRetry();
        await data_source_1.AppDataSource.runMigrations();
        const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        const departmentRepository = data_source_1.AppDataSource.getRepository(Department_1.Department);
        const employeeRepository = data_source_1.AppDataSource.getRepository(Employee_1.Employee);
        // 1. Seed Admin & User Accounts
        console.log('Seeding initial users...');
        const adminPassword = await (0, password_1.hashPassword)('admin123');
        const userPassword = await (0, password_1.hashPassword)('user123');
        let admin = await userRepository.findOne({ where: { username: 'admin' } });
        if (!admin) {
            admin = userRepository.create({
                username: 'admin',
                password: adminPassword,
                role: User_1.UserRole.ADMIN,
            });
            await userRepository.save(admin);
            console.log('-> Created Admin account (username: admin, password: admin123)');
        }
        let regularUser = await userRepository.findOne({ where: { username: 'user' } });
        if (!regularUser) {
            regularUser = userRepository.create({
                username: 'user',
                password: userPassword,
                role: User_1.UserRole.USER,
            });
            await userRepository.save(regularUser);
            console.log('-> Created Standard User account (username: user, password: user123)');
        }
        // 2. Seed Initial Departments
        console.log('Seeding departments...');
        const deptNames = ['Engineering', 'Human Resources', 'Marketing', 'Finance'];
        const departments = [];
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
    }
    catch (error) {
        console.error('❌ Error during seeding:', error);
        process.exit(1);
    }
}
seed();
