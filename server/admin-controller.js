module.exports = {
    getUsers: (req, res, next) => {
        const db = req.app.get('db');
        db.admin_read_users()
            .then(users => {
                res.status(200).send(users)
            })
        .catch(() => res.status(500).send(''))
    },
    getSections: (req, res, next) => {
        const db = req.app.get('db');
        db.admin_read_sections()
            .then(sections => {
                res.status(200).send(sections)
            })
            .catch(() => res.status(500).send(''))
    },
    getPosts: (req, res, next) => {
        const db = req.app.get('db');
        db.admin_read_posts()
            .then(posts => {
                res.status(200).send(posts)
            })
            .catch(() => res.status(500).send(''))
    },
    getPostsBySection: (req, res, next) => {
        const db = req.app.get('db');
        db.admin_read_posts_by_section([req.params.sectionid])
            .then(posts => {
                res.status(200).send(posts)
            })
            .catch(() => res.status(500).send(''))
    },
    getPostById: (req, res, next) => {
        const db = req.app.get('db');
        db.admin_read_post_by_id([req.params.postid])
            .then(post => {
                res.status(200).send(post)
            })
            .catch(() => res.status(500).send(''))
    },
    createPost: (req, res, next) => {
        const db = req.app.get('db');
        db.admin_create_post([req.body.section, req.body.subsection, req.body.title, req.body.subtitle, req.body.body, req.body.imgurl, 10])
            .then(post => {
                res.status(200).send(post)
            })
            .catch(() => res.status(500).send(''))
    },
    editPost: (req, res, next) => {
        const db = req.app.get('db');
        db.admin_edit_post([req.params.postid, req.body.section, req.body.subsection, req.body.title, req.body.subtitle, req.body.body, req.body.imgurl])
            .then(() => {
                db.admin_read_post_by_id([req.params.postid])
                    .then(post => {
                        res.status(200).send(post)
                    })
                    .catch(() => res.status(500).send(''))
            })
            .catch(() => res.status(500).send(''))
    },
    editPostBody: (req, res, next) => {
        const db = req.app.get('db');
        res.status(200).send(req.body)
        db.admin_edit_post_body([req.params.postid, req.body.string])
            .then(() => {
                db.admin_read_post_by_id([req.params.id])
                    .then(post => {
                        res.status(200).send(post)
                    })
                    .catch(() => res.status(500).send(''))
            })
            .catch(() => res.status(500).send(''))
    },
    publishPost: (req, res, next) => {
        const db = req.app.get('db');
        db.admin_publish_post([req.params.postid])
            .then(() => {
                db.admin_read_post_by_id([req.params.postid])
                    .then(post => {
                        res.status(200).send(post)
                    })
                    .catch(() => res.status(500).send(''))
            })
            .catch(() => res.status(500).send(''))
    },
    unpublishPost: (req, res, next) => {
        const db = req.app.get('db');
        db.admin_unpublish_post([req.params.postid])
            .then(() => {
                db.admin_read_post_by_id([req.params.postid])
                    .then(post => {
                        res.status(200).send(post)
                    })
                    .catch(() => res.status(500).send(''))
            })
            .catch(() => res.status(500).send(''))
    },
    addHtml: (req, res, next) => {
        const db = req.app.get('db');
        db.add_html([req.body.body])
            .then(html => {
                res.status(200).send(html)
            })
            .catch(() => res.status(500).send(''))
    },
    readHtml: (req, res, next) => {
        const db = req.app.get('db');
        db.read_html([req.params.id])
            .then(html => {
                res.status(200).send(html)
            })
            .catch(() => res.status(500).send(''))
    }
}