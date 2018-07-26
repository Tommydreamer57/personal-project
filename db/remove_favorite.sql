DELETE FROM blog_favorites
WHERE userid = $1
AND postid = $2