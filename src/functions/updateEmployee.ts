import { Pool } from 'pg';
import inquirer from 'inquirer';

export async function updateEmployee(pool: Pool) {
    try {
        // Fetch the list of employees
        const employees = await pool.query('SELECT id, first_name, last_name FROM employee;');

        if (employees.rows.length === 0) {
            console.log('No employees available to update.');
            return;
        }

        // Fetch the list of roles
        const roles = await pool.query('SELECT id, title FROM role;');

        if (roles.rows.length === 0) {
            console.log('No roles available for updates.');
            return;
        }

        // Prompt user to select an employee and a new role
        const { employeeId, newRoleId } = await inquirer.prompt([
            {
                type: 'list',
                name: 'employeeId',
                message: 'Select the employee to update:',
                choices: employees.rows.map((emp: { id: number; first_name: string; last_name: string }) => ({
                    name: `${emp.first_name} ${emp.last_name}`,
                    value: emp.id,
                })),
            },
            {
                type: 'list',
                name: 'newRoleId',
                message: 'Select the new role for the employee:',
                choices: roles.rows.map((role: { id: number; title: string }) => ({
                    name: role.title,
                    value: role.id,
                })),
            },
        ]);

        // Update the employee's role in the database
        await pool.query(
            `UPDATE employee
             SET role_id = $1
             WHERE id = $2;`,
            [newRoleId, employeeId]
        );

        console.log('Employee role updated successfully!');
    } catch (error) {
        console.error('Error updating employee:', error);
    }
}