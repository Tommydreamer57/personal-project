module.exports = {
    getPosts: (req, res, next) => {
        const db = req.app.get('db');
        db.admin_read_posts()
            .then(posts => {
                res.send(posts)
            })
    },
    editPost: (req, res, next) => {
        const db = req.app.get('db');
        db.admin_edit_post([req.params.postid, req.body.section, req.body.subsection, req.body.title, req.body.subtitle, req.body.body, req.body.imgurl])
            .then(() => {
                db.admin_read_post_by_id(req.params.postid)
                    .then(post => {
                        res.send(post)
                    })
            })
    }
}