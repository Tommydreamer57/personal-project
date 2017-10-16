
module.exports = {
    // CONTENT
    getSections: (req, res, next) => {
        const db = req.app.get('db');
        db.read_sections()
            .then(sections => {
                res.send(sections)
            })
    },
    getPostsBySection: (req, res, next) => {
        const db = req.app.get('db');
        db.read_posts_by_section([req.params.section])
            .then(posts => {
                res.send(posts)
            })
    },
    getPostById: (req, res, next) => {
        const db = req.app.get('db');
        db.read_post_by_id([req.params.postid])
            .then(post => {
                res.send(post)
            })
    },
    // USER
    getUserByUsername: (req, res, next) => {
        const db = req.app.get('db');
        db.find_current_user(req.params.username)
            .then(user => {
                res.send(user)
            })
    },
    // COMMENTS
    getCommentsByPost: (req, res, next) => {
        const db = req.app.get('db');
        db.read_comments(req.params.postid)
            .then(comments => {
                res.send(comments)
            })
    },
    addCommentToPost: (req, res, next) => {
        const db = req.app.get('db');
        db.add_comment([req.body.userid, req.params.postid, req.body.body])
            .then(() => db.read_comments(req.params.postid)
                .then(comments => {
                    res.send(comments)
                }))
    },
    getResponsesByComment: (req, res, next) => {
        const db = req.app.get('db');
        db.read_responses([req.params.commentid])
            .then(responses => {
                res.send(responses)
            })
    },
    addResponseToComment: (req, res, next) => {
        const db = req.app.get('db');
        db.add_response([req.body.userid, req.params.commentid, req.body.body])
            .then(() => {
                db.read_responses([req.params.commentid])
                    .then(responses => {
                        res.send(responses)
                    })
            })
    },
    // FAVORITES
    getFavoritesByUser: (req, res, next) => {
        const db = req.app.get('db');
        db.read_favorites([req.params.userid])
            .then(favorites => {
                res.send(favorites)
            })
    },
    addFavoriteToUser: (req, res, next) => {
        const db = req.app.get('db');
        db.add_favorite([req.params.userid, req.params.postid])
            .then(() => db.read_favorites([req.params.userid])
                .then(favorites => {
                    res.send(favorites)
                })
            )
    },
    removeFavorite: (req, res, next) => {
        const db = req.app.get('db');
        db.remove_favorite([req.params.userid, req.params.postid])
            .then(() => db.read_favorites([req.params.userid])
                .then(favorites => {
                    res.send(favorites)
                })
            )
    }
}
