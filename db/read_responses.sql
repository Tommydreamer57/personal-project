SELECT blog_responses.id as id, commentid, userid, body, date, first_name, last_name, username, email, imgurl, auth_id, language, color, gender, provider, admin FROM blog_responses
JOIN blog_users ON blog_users.id = blog_responses.userid
WHERE commentid = $1