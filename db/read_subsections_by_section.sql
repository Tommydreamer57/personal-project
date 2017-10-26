SELECT DISTINCT subsection FROM posts
WHERE section = $1
AND published = true