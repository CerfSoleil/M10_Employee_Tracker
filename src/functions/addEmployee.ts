import { Pool } from 'pg';
import inquirer from 'inquirer';

export async function addEmployee(pool: Pool) {
    try {
        // Fetch available roles
        const roles = await pool.query('SELECT id, title FROM role;');
        const employees = await pool.query('SELECT id, first_name, last_name FROM employee;');

        // Prompt user for input
        const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Enter the first name of the employee:',
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Enter the last name of the employee:',
            },
            {
                type: 'list',
                name: 'roleId',
                message: 'Select the role of the employee:',
                choices: roles.rows.map((role: { id: number; title: string }) => ({
                    name: role.title,
                    value: role.id,
                })),
            },
            {
                type: 'list',
                name: 'managerId',
                message: 'Select the manager of the employee (or None):',
                choices: [
                    { name: 'None', value: null },
                    ...employees.rows.map((emp: { id: number; first_name: string; last_name: string }) => ({
                        name: `${emp.first_name} ${emp.last_name}`,
                        value: emp.id,
                    })),
                ],
            },
        ]);

        // Insert new employee into the database
        await pool.query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id)
             VALUES ($1, $2, $3, $4);`,
            [firstName, lastName, roleId, managerId]
        );

        console.log(`Employee ${firstName} ${lastName} added successfully!`);
    } catch (error) {
        console.error('Error adding employee:', error);
    }
}
