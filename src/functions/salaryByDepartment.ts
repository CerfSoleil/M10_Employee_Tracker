import { Pool } from 'pg';
import inquirer from 'inquirer';

export async function viewTotalSalariesByDepartment(pool: Pool) {
    try {
        // Fetch all departments to allow user selection
        const departments = await pool.query('SELECT id, name FROM department;');

        if (departments.rows.length === 0) {
            console.log('No departments available to view salaries.');
            return;
        }

        // Prompt user to select a department
        const { departmentId } = await inquirer.prompt([
            {
                type: 'list',
                name: 'departmentId',
                message: 'Select a department to view total salaries:',
                choices: departments.rows.map((dept: { id: number; name: string }) => ({
                    name: dept.name,
                    value: dept.id,
                })),
            },
        ]);

        // Query the total salaries for the selected department
        const result = await pool.query(
            `SELECT SUM(r.salary) AS total_salary
             FROM role r
             JOIN employee e ON e.role_id = r.id
             WHERE r.department_id = $1;`,
            [departmentId]
        );

        const totalSalary = result.rows[0]?.total_salary || 0;
        console.log(`Total combined salaries in the selected department: $${totalSalary}`);
    } catch (error) {
        console.error('Error fetching total salaries by department:', error);
    }
}
