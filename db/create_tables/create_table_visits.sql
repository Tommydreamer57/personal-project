CREATE TABLE visits (
    id SERIAL PRIMARY KEY,
    user_auth_id TEXT,
    date TIMESTAMP,
    FOREIGN KEY (user_auth_id) REFERENCES users(auth_id)
)