CREATE TABLE responses (
    id SERIAL PRIMARY KEY,
    commentid INTEGER,
    userid INTEGER,
    body TEXT,
    date TIMESTAMP,
    FOREIGN KEY (commentid) REFERENCES comments(id),
    FOREIGN KEY (userid) REFERENCES users(id)
)