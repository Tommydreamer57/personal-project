module.exports = {
    getPosts: (req, res, next) => {
        const db = req.app.get('db');
        db.admin_read_posts()
            .then(posts => {
                res.send(posts)
            })
    }
}