DROP DATABASE IF EXISTS work_db;

CREATE DATABASE work_db;

USE work_db;

CREATE TABLE department (
    id  INTEGER(11) AUTO_INCREMENT,
    name VARCHAR(100),
    PRIMARY KEY(id)
);

CREATE TABLE job (
    id INTEGER(11) AUTO_INCREMENT,
    title VARCHAR(100),
    salary DECIMAL(2),
    department_id INTEGER(11),
    PRIMARY KEY(id)
);

CREATE TABLE employee (
    id INTEGER(11) AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER(11),
    manager_id INTEGER(11),
    PRIMARY KEY(id)
);