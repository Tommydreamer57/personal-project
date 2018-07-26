SELECT users.id, first_name, last_name, username, email, imgurl, auth_id, language, color, gender, provider, admin, COUNT(*) as visits, MAX(date) AS date FROM blog_users
JOIN blog_visits ON blog_visits.user_auth_id = blog_users.auth_id
GROUP BY users.id
ORDER BY users.id