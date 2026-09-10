import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class InitialSchema1725952000000 implements MigrationInterface {
  name = 'InitialSchema1725952000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Create users table
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'username',
            type: 'varchar',
            length: '50',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'role',
            type: 'enum',
            enum: ['Admin', 'User'],
            default: "'User'",
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
          },
        ],
      }),
      true
    );

    // 2. Create departments table
    await queryRunner.createTable(
      new Table({
        name: 'departments',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
          },
        ],
      }),
      true
    );

    // 3. Create employees table
    await queryRunner.createTable(
      new Table({
        name: 'employees',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'firstName',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'lastName',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '150',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'hireDate',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'salary',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'departmentId',
            type: 'varchar',
            length: '36',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
          },
        ],
      }),
      true
    );

    // 4. Create foreign key between employees and departments
    await queryRunner.createForeignKey(
      'employees',
      new TableForeignKey({
        name: 'FK_employees_department',
        columnNames: ['departmentId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'departments',
        onDelete: 'SET NULL',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign key and tables in reverse order
    await queryRunner.dropForeignKey('employees', 'FK_employees_department');
    await queryRunner.dropTable('employees');
    await queryRunner.dropTable('departments');
    await queryRunner.dropTable('users');
  }
}
