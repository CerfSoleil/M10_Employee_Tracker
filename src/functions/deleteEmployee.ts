import { Pool } from 'pg';
import inquirer from 'inquirer';

export async function deleteEmployee(pool: Pool) {
    try {
        // Fetch the list of existing employees
        const employee = await pool.query('SELECT id, name FROM employee;');

        if (employee.rows.length === 0) {
            console.log('No employeees available to delete.');
            return;
        }

        // Prompt user to select a employee to delete
        const { employeeId } = await inquirer.prompt([
            {
                type: 'list',
                name: 'employeeId',
                message: 'Select the department to delete:',
                choices: employee.rows.map((emp: { id: number; name: string }) => ({
                    name: emp.name,
                    value: emp.id,
                })),
            },
        ]);

        // Delete the selected department from the database
        await pool.query(
            `DELETE FROM employee
             WHERE id = $1;`,
            [employeeId]
        );

        console.log('Employee deleted successfully!');
    } catch (error) {
        console.error('Error deleting employee:', error);
    }
}