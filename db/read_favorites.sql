SELECT blog_posts.id, section, subsection, title, subtitle, body, blog_posts.imgurl as postimgurl, date, first_name, last_name, username, blog_users.imgurl as userimgurl FROM blog_posts
JOIN blog_favorites ON blog_favorites.postid = blog_posts.ID
JOIN blog_users on blog_posts.author_id = blog_users.id
WHERE blog_favorites.userid = $1
AND published = true