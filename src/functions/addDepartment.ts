import { Pool } from 'pg';
import inquirer from 'inquirer';

export async function addDepartment(pool: Pool) {
    try {
        // Prompt user for the name of the new department
        const { departmentName } = await inquirer.prompt([
            {
                type: 'input',
                name: 'departmentName',
                message: 'Enter the name of the new department:',
            },
        ]);

        // Insert the new department into the database
        await pool.query(
            `INSERT INTO department (name)
             VALUES ($1);`,
            [departmentName]
        );

        console.log(`Department "${departmentName}" added successfully!`);
    } catch (error) {
        console.error('Error adding department:', error);
    }
}
