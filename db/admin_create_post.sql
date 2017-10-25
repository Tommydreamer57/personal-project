INSERT INTO posts (section, subsection, title, subtitle, imgurl, date, published, author_id)
VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, FALSE, $6)
RETURNING *