import { Pool } from 'pg';
import inquirer from 'inquirer';

export async function deleteDepartment(pool: Pool) {
    try {
        // Fetch the list of existing departments
        const departments = await pool.query('SELECT id, name FROM department;');

        if (departments.rows.length === 0) {
            console.log('No departments available to delete.');
            return;
        }

        // Prompt user to select a department to delete
        const { departmentId } = await inquirer.prompt([
            {
                type: 'list',
                name: 'departmentId',
                message: 'Select the department to delete:',
                choices: departments.rows.map((dept: { id: number; name: string }) => ({
                    name: dept.name,
                    value: dept.id,
                })),
            },
        ]);

        // Delete the selected department from the database
        await pool.query(
            `DELETE FROM department
             WHERE id = $1;`,
            [departmentId]
        );

        console.log('Department deleted successfully!');
    } catch (error) {
        console.error('Error deleting department:', error);
    }
}