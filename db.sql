-- Create database if not exists
CREATE DATABASE IF NOT EXISTS task_db;

-- Use the database
USE task_db;

-- Create task table
CREATE TABLE IF NOT EXISTS task (
    Id INT INT PRIMARY KEY AUTO_INCREMENT,
    TaskId VARCHAR(100) NOT NULL UNIQUE,
    taskName VARCHAR(100) NOT NULL,
    Prototype VARCHAR(100) NOT NULL,
    Status TINYINT NOT NULL,
    Workload DECIMAL(10, 0) NOT NULL,
    CreateTime DATETIME NOT NULL,
    UpdateTime DATETIME NOT NULL,
    INDEX idx_taskid (TaskId),
    INDEX idx_status (Status),
    INDEX idx_prototype (Prototype)
);