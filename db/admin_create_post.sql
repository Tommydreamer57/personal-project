INSERT INTO blog_posts (section, subsection, title, subtitle, body, imgurl, date, published, author_id)
VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP, FALSE, $7)
RETURNING *