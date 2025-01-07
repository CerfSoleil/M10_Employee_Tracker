import { Pool } from 'pg';
import inquirer from 'inquirer';


export async function viewEmployeesByDepartment(pool: Pool) {
    const { departmentName } = await inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'Enter the department name to view employees:',
        },
    ]);

    try {
        const result = await pool.query(
            `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department
             FROM employee e
             JOIN role r ON e.role_id = r.id
             JOIN department d ON r.department_id = d.id
             WHERE d.name = $1;`,
            [departmentName]
        );

        console.table(result.rows);
    } catch (error) {
        console.error('Error fetching employees by department:', error);
    }
}