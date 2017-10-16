CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    postid INTEGER,
    userid INTEGER,
    body TEXT,
    date TIMESTAMP,
    FOREIGN KEY (postid) REFERENCES posts(id),
    FOREIGN KEY (userid) REFERENCES users(id)
)