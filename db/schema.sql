\c postgres;
DROP DATABASE IF EXISTS fix_db;

CREATE DATABASE fix_db;
\c fix_db;


-- CREATE TABLE tenants(
--     id SERIAL PRIMARY KEY,
--     tenant_name VARCHAR(100),
--     tenant_email VARCHAR(100),
--     tenant_password VARCHAR(50)
-- );

-- CREATE TABLE managers(
--     id SERIAL PRIMARY KEY,
--     manager_name VARCHAR(100),
--     manager_email VARCHAR(100),
--     manager_password VARCHAR(50)
-- );

-- INSERT INTO managers(manager_name)
--     VALUES
--         ('Ozge'),
--         ('Andrew'),
--         ('Kee'),
--         ('Whougie'),
--         ('Amy');


-- INSERT INTO tenants(tenant_name)
--     VALUES
--         ('Gary'),
--         ('Katy'),
--         ('Brittany'),
--         ('Vanessa'),
--         ('Maggie');


-- CREATE TABLE apartments(
--     id SERIAL PRIMARY KEY,
--     apt_number INTEGER,
--     layout VARCHAR(50),
--     tenant_id INTEGER,
--     FOREIGN KEY (tenant_id)
--     REFERENCES tenants(id)
-- );

-- INSERT INTO apartments(apt_number, tenant_id)
--     VALUES
--         (401, 1),
--         (202, 2),
--         (261, 3),
--         (321, 4),
--         (202, 5);


-- SELECT apt_number, tenants.tenant_name FROM apartments
-- JOIN tenants ON apartments.tenant_id = tenants.id;


-- CREATE TABLE issue(
--     id SERIAL PRIMARY KEY,
--     room VARCHAR(30),
--     issue TEXT,
--     date_requested VARCHAR(10),
--     apartment_id INTEGER,
--     FOREIGN KEY (apartment_id)
--     REFERENCES apartments(id)
-- );

-- CREATE TABLE schedule(
--     id SERIAL PRIMARY KEY,
--     fix_date VARCHAR(10),
--     tenant_id INTEGER,
--     FOREIGN KEY (tenant_id)
--     REFERENCES tenants(id),
--     apartment_id INTEGER,
--     FOREIGN KEY (apartment_id)
--     REFERENCES apartments(id),
--     issue_id INTEGER,
--     FOREIGN KEY (issue_id)
--     REFERENCES issue(id)
-- );


