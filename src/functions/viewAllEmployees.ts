import { Pool } from 'pg';

export async function viewAllEmployees(pool: Pool) {
    try {
        // Query to fetch all employees with their roles, managers, and departments
        const result = await pool.query(
            `SELECT 
                e.id, 
                e.first_name, 
                e.last_name, 
                r.title AS role, 
                d.name AS department, 
                r.salary, 
                CASE WHEN e.manager_id IS NOT NULL THEN (SELECT first_name || ' ' || last_name FROM employee WHERE id = e.manager_id) ELSE 'None' END AS manager
             FROM employee e
             JOIN role r ON e.role_id = r.id
             JOIN department d ON r.department_id = d.id
             ORDER BY e.id;`
        );

        if (result.rows.length > 0) {
            console.table(result.rows);
        } else {
            console.log('No employees found in the database.');
        }
    } catch (error) {
        console.error('Error fetching all employees:', error);
    }
}
