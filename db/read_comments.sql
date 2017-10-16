SELECT comments.id AS id, postid, userid, body, date, first_name, last_name, username, email, imgurl, auth_id, language, color, gender, provider, admin FROM comments
JOIN users ON users.id = comments.userid
WHERE postid = $1