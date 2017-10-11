const Auth0Strategy = require('passport-auth0');
require('dotenv').config();
const app = require('./index');

module.exports = new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
}, function (accessToken, refreshToken, extraParams, profile, done) {
    const db = app.get('db');
    db.find_user([String(profile.identities[0].user_id)]).then(user => {
        if (user[0]) {
            return done(null, user[0].id)
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
                        .then(user => done(null, user[0].id))
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
                        .then(user => done(null, user[0].id))
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
                        .then(user => done(null, user[0].id))
                    break;
            }
        }
    })
})