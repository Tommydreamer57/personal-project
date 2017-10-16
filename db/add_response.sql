INSERT INTO responses (commentid, userid, body, date)
VALUES ($1, $2, $3, CURRENT_TIMESTAMP)