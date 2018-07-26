UPDATE blog_posts
SET
    section = $2,
    subsection = $3,
    title = $4,
    subtitle = $5,
    body = $6,
    imgurl = $7,
    date = CURRENT_TIMESTAMP

WHERE id = $1