SELECT responses.id as id, commentid, userid, body, date, first_name, last_name, username, email, imgurl, auth_id, language, color, gender, provider, admin FROM responses
JOIN users ON users.id = responses.userid
WHERE commentid = $1