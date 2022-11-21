USE employee_db;

INSERT INTO department (name)
VALUES ("Engineering"),
       ("Finance"),
       ("Marketing"),
       ("HR"),
       ("Operations");

INSERT INTO role (title, salary, department_id)
VALUES ("Web Designer", 60000.00, 1),
       ("Grahic Designer", 50000.00, 1),
       ("Sound Producer", 45000.00, 1),
       ("Superviser", 80000.00, 4),
       ("Director of Operations", 100000.00, 5),
       ("HR Persons", 30000.00, 4),
       ("Marketing Director", 120000.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Antigonus", "Neil", 6, NULL),
       ("Mòrag", "Tom", 5, NULL),
       ("Pòl", "Zinoviy", 4, NULL),
       ("Dugald", "Despoina", 3, 1),
       ("Demyan", "Angela", 2, 1),
       ("Tiamat", "Arieh", 1, 1),
       ("Riacán", "Beorhtsige", 1, 1);
