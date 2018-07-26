
module.exports = {
    // CONTENT
    getSections: (req, res, next) => {
        const db = req.app.get('db');
        db.read_sections()
            .then(sections => {
                res.send(sections)
            })
            .catch(() => res.status(500).send('getSections broke'))
    },
    getSubsectionsBySection: (req, res, next) => {
        const db = req.app.get('db');
        db.read_subsections_by_section([req.params.section])
            .then(subsections => {
                res.send(subsections)
            })
            .catch(() => res.status(500).send('getSubSectionsBySection broke'))
    },
    getPostsBySection: (req, res, next) => {
        const db = req.app.get('db');
        db.read_posts_by_section([req.params.section])
            .then(posts => {
                res.send(posts)
            })
            .catch(() => res.status(500).send('getPostsBySection broke'))
    },
    getPostById: (req, res, next) => {
        console.log('user postid')
        console.log(req.params.postid)
        const db = req.app.get('db');
        db.read_post_by_id([req.params.postid])
            .then(post => {
                res.send(post)
            })
            .catch(() => res.status(500).send('getPostById broke'))
    },
    // USER
    getUserByUsername: (req, res, next) => {
        const db = req.app.get('db');
        db.find_current_user(req.params.username)
            .then(user => {
                res.send(user)
            })
            .catch(() => res.status(500).send('getUserByUsername broke'))
    },
    // COMMENTS
    getCommentsByPost: (req, res, next) => {
        const db = req.app.get('db');
        db.read_comments(req.params.postid)
            .then(comments => {
                res.send(comments)
            })
            .catch(() => res.status(500).send('getCommentsByPost broke'))
    },
    addCommentToPost: (req, res, next) => {
        console.log("adding comment to post - userid: " + req.body.userid + " postid: " + req.params.postid + " body: " + req.body.body)
        const db = req.app.get('db');
        db.add_comment([req.body.userid, req.params.postid, req.body.body])
            .then(() => db.read_comments(req.params.postid)
                .then(comments => {
                    res.send(comments)
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).send('addCommentToPost read_comments broke')
                })
            )
            .catch((err) => {
                console.log(err);
                res.status(500).send('addCommentToPost broke')
            })
    },
    getResponsesByComment: (req, res, next) => {
        const db = req.app.get('db');
        db.read_responses([req.params.commentid])
            .then(responses => {
                res.send(responses)
            })
            .catch(() => res.status(500).send('getResponsesByComment broke'))
    },
    addResponseToComment: (req, res, next) => {
        const db = req.app.get('db');
        db.add_response([req.body.userid, req.params.commentid, req.body.body])
            .then(() => {
                db.read_responses([req.params.commentid])
                    .then(responses => {
                        res.send(responses)
                    })
                    .catch(() => res.status(500).send('addResponseToComment read_responses broke'))
            })
            .catch(() => res.status(500).send('addResponseToComment broke'))
    },
    // FAVORITES
    getFavoritesByUser: (req, res, next) => {
        const db = req.app.get('db');
        db.read_favorites([req.params.userid])
            .then(favorites => {
                res.send(favorites)
            })
            .catch(() => res.status(500).send('getFavoritesByUser broke'))
    },
    addFavoriteToUser: (req, res, next) => {
        const db = req.app.get('db');
        db.add_favorite([req.params.userid, req.params.postid])
            .then(() => db.read_favorites([req.params.userid])
                .then(favorites => {
                    res.send(favorites)
                })
                .catch(() => res.status(500).send('addFavoriteToUser read_favorites broke'))
            )
            .catch(() => res.status(500).send('addFavoriteToUser broke'))
    },
    removeFavorite: (req, res, next) => {
        const db = req.app.get('db');
        db.remove_favorite([req.params.userid, req.params.postid])
            .then(() => db.read_favorites([req.params.userid])
                .then(favorites => {
                    res.send(favorites)
                })
                .catch(() => res.status(500).send('removeFavorite read_favorites broke'))
            )
            .catch(() => res.status(500).send('removeFavorite broke'))
    }
}
