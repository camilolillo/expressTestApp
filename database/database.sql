-- Crear la base de datos testdb
CREATE DATABASE apitestdb;

-- Conectar a la base de datos testdb
\c apitestdb;

-- Crear la tabla users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    email TEXT
);

-- Insertar datos de prueba
INSERT INTO users (name, email) VALUES
('John Doe', 'john.doe@example.com'),
('Jane Smith', 'jane.smith@example.com'),
('Alice Johnson', 'alice.johnson@example.com'),
('Bob Brown', 'bob.brown@example.com'),
('Charlie Black', 'charlie.black@example.com');
