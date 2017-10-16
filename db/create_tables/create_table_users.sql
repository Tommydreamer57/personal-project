CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    username VARCHAR(100),
    email VARCHAR(200),
    imgurl TEXT,
    auth_id TEXT,
    language VARCHAR(40),
    color VARCHAR(40),
    gender VARCHAR(20),
    provider VARCHAR(40),
    admin BOOLEAN
)