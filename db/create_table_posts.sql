CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    section VARCHAR(100),
    subsection VARCHAR(100),
    title VARCHAR(100),
    subtitle VARCHAR(500),
    body TEXT,
    imgurl TEXT,
    date TIMESTAMP,
    published BOOLEAN,
    author_id integer
    FOREIGN KEY (author_id) REFERENCES (users.id)
)