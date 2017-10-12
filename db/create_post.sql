INSERT INTO posts (section, subsection, title, subtitle, body, imgurl, date, published, author_id)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
RETURNING *