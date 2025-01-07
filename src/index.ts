import dotenv from 'dotenv';
dotenv.config();
import inquirer from 'inquirer';
import {pool, connectToDb} from './connection.js';
connectToDb().then(() => console.log('connected to database')).catch(err => console.error(err));

// Import all the functions
import { viewEmployeesByDepartment } from './functions/employeesByDepartment.js';
import { viewEmployeesByManager } from './functions/employeesByManager.js';
import { addEmployee } from './functions/addEmployee.js';
import { addDepartment } from './functions/addDepartment.js';
import { updateEmployee } from './functions/updateEmployee.js';
import { deleteEmployee } from './functions/deleteEmployee.js';
import { deleteDepartment } from './functions/deleteDepartment.js';
import { viewTotalSalariesByDepartment } from './functions/salaryByDepartment.js';
import { viewAllEmployees } from './functions/viewAllEmployees.js'

// Main menu
async function mainMenu() {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View Employees by Department',
                'View Employees by Manager',
                'View All Employees',
                'Add Employee',
                'Add Department',
                'Update Employee',
                'Delete Employee',
                'Delete Department',
                'View Total Salaries by Department',
                'Exit',
            ],
        },
    ]);

    switch (action) {
        case 'View Employees by Department':
            await viewEmployeesByDepartment(pool);
            break;
        case 'View Employees by Manager':
            await viewEmployeesByManager(pool);
            break;
        case 'View All Employees':
            await viewAllEmployees(pool);
            break;
        case 'Add Employee':
            await addEmployee(pool);
            break;
        case 'Add Department':
            await addDepartment(pool);
            break;
        case 'Update Employee':
            await updateEmployee(pool);
            break;
        case 'Delete Employee':
            await deleteEmployee(pool);
            break;
        case 'Delete Department':
            await deleteDepartment(pool);
            break;
        case 'View Total Salaries by Department':
            await viewTotalSalariesByDepartment(pool);
            break;
        case 'Exit':
            console.log('Exiting the application...');
            await pool.end(); // Close the database connection pool
            process.exit();
    }

    // Show the menu again after completing an action
    await mainMenu();
}

// Start the application
mainMenu().catch((error) => {
    console.error('Error running application:', error);
    pool.end();
});
