INSERT INTO department (name) VALUES
    ('Marketing'), --1--
    ('Engineering'), --2--
    ('Finance'), --3--
    ('Human Resources'), --4--
    ('Sales'), --5--
    ('Janitorial'), --6--
    ('Customer Service'), --7--
    ('Legal'); --8--

INSERT INTO role (title, salary, department_id) VALUES
    ('SEO Specialist', 65000, 1), --1--
    ('Advertising Manager', 110000, 1), --2--
    ('Software Engineer Lead', 150000, 2), --3--
    ('Software Engineer', 110000, 2), --4--
    ('Accountant', 85000, 3), --5--
    ('Tax Analyst', 65000, 3), --6--
    ('HR Manager', 95000, 4), --7--
    ('Sales Manager', 100000, 5), --8--
    ('Sales Representative', 32000, 5), --9--
    ('Janitorial Lead', 30000, 6), --10--
    ('Janitor', 27000, 6), --11--
    ('Customer Service Representative', 35000, 7), --12--
    ('Legal Consel', 150000, 8); --13--

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('Alice', 'Smith', 1, NULL), --1--
    ('Bob', 'Johnson', 2, NULL), --2--
    ('Charlie', 'Williams', 3, NULL), --3--
    ('Diana', 'Brown', 4, 3), --4--
    ('Ethan', 'Jones', 4, 3), --5--
    ('Fiona', 'Garcia', 5, NULL), --6--
    ('George', 'Martinez', 6, NULL), --7--
    ('Hannah', 'Davis', 7, NULL), --8--
    ('Ian', 'Lopez', 8, NULL), --9--
    ('Julia', 'Wilson', 9, 9), --10--
    ('Kevin', 'Anderson', 9, 9), --11--
    ('Laura', 'Thomas', 9, 9), --12--
    ('Michael', 'Taylor', 12, 9), --13--
    ('Nina', 'Moore', 10, NULL), --14--
    ('Oscar', 'Jackson', 11, 14), --15--
    ('Paula', 'Harris', 11, 14), --16--
    ('Quinn', 'Clark', 12, 9), --17--
    ('Rachel', 'Lewis', 13, NULL); --18--