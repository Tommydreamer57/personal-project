UPDATE posts
SET published = TRUE, date = CURRENT_TIMESTAMP
WHERE id = $1