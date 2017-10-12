DELETE FROM favorites
WHERE userid = $1
AND postid = $2