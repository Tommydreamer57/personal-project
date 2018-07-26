SELECT blog_comments.id AS id, postid, userid, body, date, first_name, last_name, username, email, imgurl, auth_id, language, color, gender, provider, admin FROM blog_comments
JOIN blog_users ON blog_users.id = blog_comments.userid
WHERE postid = $1