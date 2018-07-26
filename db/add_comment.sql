INSERT INTO blog_comments (userid, postid, body, date)
VALUES ($1, $2, $3, CURRENT_TIMESTAMP)