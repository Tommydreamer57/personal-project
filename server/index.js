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
    allowedConnections: ['github', 'facebook']
}, function (accessToken, refreshToken, extraParams, profile, done) {
    const db = app.get('db');
    db.find_user([String(profile.identities[0].user_id)]).then(user => {
        if (user[0]) {
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
                        .then(user => done(null, user[0].auth_id))
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
                        .then(user => done(null, user[0].auth_id))
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
                        .then(user => done(null, user[0].auth_id))
                    break;    
            }
        }
    })
}));


app.get(`/auth/`, passport.authenticate(`auth0`));
app.get(`/auth/callback`, passport.authenticate(`auth0`, {
    successRedirect: `http://localhost:3000/home`,
    failureRedirect: `/auth`
}))
app.get(`/auth/me`, (req, res, next) => {
    if (!req.user) {
        return res.status(400).send('user not found');
    }
    else return res.status(200).send(req.user);
})
app.get(`/auth/logout`, (req, res, next) => {
    let { user } = req
    req.logOut();
    res.redirect(302, `http://localhost:3000/`)
})


// MY OWN ENDPOINTS HERE

// USER

app.get(`/user/:username`, uc.getUserByUsername)

// CONTENT

app.get(`/sections`, uc.getSections)
app.get(`/subsections/:section`, uc.getSubsectionsBySection)
app.get(`/posts/:section`, uc.getPostsBySection)
app.get(`/post/:postid`, uc.getPostById)

// COMMENTS

app.get(`/comments/:postid`, uc.getCommentsByPost)
app.post(`/comments/:postid`, uc.addCommentToPost)
app.get(`/responses/:commentid`, uc.getResponsesByComment)
app.post(`/responses/:commentid`, uc.addResponseToComment)

// FAVORITES

app.get(`/favorites/:userid`, uc.getFavoritesByUser)
app.post(`/favorites/:userid/:postid`, uc.addFavoriteToUser)
app.delete(`/favorites/:userid/:postid`, uc.removeFavorite)

// ADMIN

app.get(`/admin/sections`, ac.getSections)
app.get(`/admin/posts`, ac.getPosts)
app.get(`/admin/posts/:sectionid`, ac.getPostsBySection)
app.get(`/admin/post/:postid`, ac.getPostById)
app.post(`/admin/createpost/:adminid`, ac.createPost)
app.put(`/admin/editpost/:postid`, ac.editPost)
app.put(`/admin/publish/:postid`, ac.publishPost)
app.put(`/admin/unpublish/:postid`, ac.unpublishPost)

app.put(`/admin/slate/body/:postid`, ac.editPostBody)

// SLATE PRACTICE - HTML

app.get(`/admin/html/:id`, ac.readHtml)
app.post(`.admin/html/`, ac.addHtml)


// MY OWN ENDPOINTS ABOVE


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
