INSERT INTO responses (userid, commentid, body, date)
VALUES ($1, $2, $3, CURRENT_TIMESTAMP)