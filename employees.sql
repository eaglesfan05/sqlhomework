DROP DATABASE IF EXISTS work_db;

CREATE DATABASE work_db;

USE work_db;

CREATE TABLE department (
    id  INTEGER(11) AUTO_INCREMENT,
    name VARCHAR(100),
    PRIMARY KEY(id)
);

CREATE TABLE job (
    role_id INTEGER(11) AUTO_INCREMENT,
    title VARCHAR(100),
    salary INTEGER(30),
    department_id VARCHAR(100),
    PRIMARY KEY(id)
);

CREATE TABLE employee (
    id INTEGER(11) AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    title VARCHAR(30),
    manager_id VARCHAR(30),
    PRIMARY KEY(id)
);

SELECT * FROM department;
SELECT * FROM job;
SELECT * FROM employee;