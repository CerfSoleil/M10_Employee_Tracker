import { Pool } from 'pg';
import inquirer from 'inquirer';

export async function viewEmployeesByManager(pool: Pool) {
    try {
        // Fetch the list of employees to choose a manager
        const managers = await pool.query('SELECT id, first_name, last_name FROM employee;');

        if (managers.rows.length === 0) {
            console.log('No employees available to select as managers.');
            return;
        }

        // Prompt user to select a manager
        const { managerId } = await inquirer.prompt([
            {
                type: 'list',
                name: 'managerId',
                message: 'Select a manager to view their employees:',
                choices: managers.rows.map((mgr: { id: number; first_name: string; last_name: string }) => ({
                    name: `${mgr.first_name} ${mgr.last_name}`,
                    value: mgr.id,
                })),
            },
        ]);

        // Query to get employees under the selected manager
        const result = await pool.query(
            `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department
             FROM employee e
             JOIN role r ON e.role_id = r.id
             JOIN department d ON r.department_id = d.id
             WHERE e.manager_id = $1;`,
            [managerId]
        );

        if (result.rows.length > 0) {
            console.table(result.rows);
        } else {
            console.log('No employees found for the selected manager.');
        }
    } catch (error) {
        console.error('Error fetching employees by manager:', error);
    }
}
