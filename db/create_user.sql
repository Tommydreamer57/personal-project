INSERT INTO blog_users (first_name, last_name, username, email, imgurl, auth_id, gender, provider, admin)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, FALSE)
RETURNING *