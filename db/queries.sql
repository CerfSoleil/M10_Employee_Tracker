-- Get all employees by department
SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department
FROM employee e
JOIN role r ON e.role_id = r.id
JOIN department d ON r.department_id = d.id
WHERE d.name = $1;

-- Get all employees by manager
SELECT e.id, e.first_name, e.last_name, m.first_name AS manager_first_name, m.last_name AS manager_last_name
FROM employee e
LEFT JOIN employee m ON e.manager_id = m.id
WHERE m.id = $1;

-- Get total combined salaries in a department
SELECT SUM(r.salary) AS total_salary
FROM role r
JOIN department d ON r.department_id = d.id
WHERE d.name = $1;