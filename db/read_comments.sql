SELECT * FROM comments
JOIN users ON users.id = comments.userid
WHERE postid = $1