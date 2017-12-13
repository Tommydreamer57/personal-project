const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const massive = require('massive');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const cors = require('cors');
require('dotenv').config();

const uc = require('./user-controller');
const ac = require('./admin-controller.js');

const PORT = process.env.PORT || 3001;
const CONNECTION_STRING = process.env.CONNECTION_STRING

const app = express();

massive(CONNECTION_STRING).then(db => app.set('db', db));

app.use(express.static(`${__dirname}/../build`));
app.use(cors());
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    allowedConnections: ['github', 'facebook', 'google-oauth2']
}, function (accessToken, refreshToken, extraParams, profile, done) {
    const db = app.get('db');
    db.find_user([String(profile.identities[0].user_id)]).then(user => {
        if (user[0]) {
            db.add_visit([String(user[0].auth_id)])
            return done(null, user[0].auth_id)
        }
        else {
            switch (profile.provider) {
                case 'github':
                    db.create_user([
                        profile.name.givenName,
                        profile.name.familyName,
                        profile.nickname,
                        null,
                        profile.picture,
                        profile.identities[0].user_id,
                        null,
                        profile.provider
                    ])
                        .then(user => {
                            db.add_visit([String(user[0].auth_id)])
                            done(null, user[0].auth_id)
                        })
                    break;
                case 'facebook':
                    db.create_user([
                        profile.name.givenName,
                        profile.name.familyName,
                        profile.nickname,
                        null,
                        profile.picture,
                        profile.identities[0].user_id,
                        profile.gender,
                        profile.provider
                    ])
                        .then(user => {
                            db.add_visit([String(user[0].auth_id)])
                            done(null, user[0].auth_id)
                        })
                    break;
                case 'google-oauth2':
                    db.create_user([
                        profile.name.givenName,
                        profile.name.familyName,
                        profile.nickname,
                        profile.emails[0].value,
                        profile.picture,
                        profile.identities[0].user_id,
                        null,
                        profile.provider
                    ])
                        .then(user => {
                            db.add_visit([String(user[0].auth_id)])
                            done(null, user[0].auth_id)
                        })
                    break;
            }
        }
    })
}));


app.get(`/auth/`, passport.authenticate(`auth0`));
app.get(`/auth/callback`, passport.authenticate(`auth0`, {
    successRedirect: process.env.SUCCESS_REDIRECT,
    failureRedirect: process.env.FAILURE_REDIRECT
}))
app.get(`/auth/me`, (req, res, next) => {
    console.log(req.user)
    if (!req.user) {
        return res.status(200).send({
            admin: true,
            id: null,
            username: 'Friend'
        })
        return res.status(400).send('user not found');
    }
    else return res.status(200).send(Object.assign({}, req.user, { admin: true }));
})
app.get(`/auth/logout`, (req, res, next) => {
    let { user } = req
    req.logOut();
    res.redirect(302, `/`)
})


// MY OWN ENDPOINTS HERE

// USER

app.get(`/api/user/:username`, uc.getUserByUsername)

// CONTENT

app.get(`/api/sections`, uc.getSections)
app.get(`/api/subsections/:section`, uc.getSubsectionsBySection)
app.get(`/api/posts/:section`, uc.getPostsBySection)
app.get(`/api/post/:postid`, uc.getPostById)

// COMMENTS

app.get(`/api/comments/:postid`, uc.getCommentsByPost)
app.post(`/api/comments/:postid`, uc.addCommentToPost)
app.get(`/api/responses/:commentid`, uc.getResponsesByComment)
app.post(`/api/responses/:commentid`, uc.addResponseToComment)

// FAVORITES

app.get(`/api/favorites/:userid`, uc.getFavoritesByUser)
app.post(`/api/favorites/:userid/:postid`, uc.addFavoriteToUser)
app.delete(`/api/favorites/:userid/:postid`, uc.removeFavorite)

// ADMIN

app.get(`/api/admin/users`, ac.getUsers)

app.get(`/api/admin/sections`, ac.getSections)
app.get(`/api/admin/posts`, ac.getPosts)
app.get(`/api/admin/posts/:sectionid`, ac.getPostsBySection)
app.get(`/api/admin/post/:postid`, ac.getPostById)
app.post(`/api/admin/create/:adminid`, ac.createPost)
app.put(`/api/admin/editpost/:postid`, ac.editPost)
app.put(`/api/admin/publish/:postid`, ac.publishPost)
app.put(`/api/admin/unpublish/:postid`, ac.unpublishPost)

app.put(`/api/admin/slate/body/:postid`, ac.editPostBody)

// SLATE PRACTICE - HTML

app.get(`/api/admin/html/:id`, ac.readHtml)
app.post(`/api/admin/html/`, ac.addHtml)

// MY OWN ENDPOINTS ABOVE


const path = require('path')

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
})


passport.serializeUser(function (id, done) {
    done(null, id);
})
passport.deserializeUser(function (id, done) {
    app.get('db').find_user([id])
        .then(user => {
            done(null, user[0]);
        })
})

app.listen(PORT, () => console.log(`running on port ${PORT}`))

module.exports = app;
