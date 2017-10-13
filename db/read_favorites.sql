SELECT posts.id, section, subsection, title, subtitle, body, posts.imgurl as postimgurl, date, first_name, last_name, username, users.imgurl as userimgurl FROM posts
JOIN favorites ON favorites.postid = posts.ID
JOIN users on posts.author_id = users.id
WHERE favorites.userid = $1
