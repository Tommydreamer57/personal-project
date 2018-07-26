SELECT DISTINCT subsection FROM blog_posts
WHERE section = $1
AND published = true