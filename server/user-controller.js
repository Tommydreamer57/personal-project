
module.exports = {
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
    getUserByUsername: (req, res, next) => {
        const db = req.app.get('db');
        db.find_current_user(req.params.username)
            .then(user => {
                res.send(user)
            })
    },
    getFavoritesByUser: (req, res, next) => {
        const db = req.app.get('db');
        db.read_favorites([req.params.user])
            .then()
    },
    addFavoriteToUser: (req, res, next) => {
        const db = req.app.get('db');
        db.add_favorite([req.params.userid, req.params.postid])
            .then()
    },
    removeFavorite: (req, res, next) => {
        const db = req.app.get('db');
        db.remove_favorite([req.params.userid, req.params.postid])
            .then()
    }
}
