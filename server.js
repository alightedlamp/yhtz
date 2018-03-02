require('dotenv').config();
const keys = require('./config/keys');

process.env.NODE_ENV = keys.env || 'production';

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');

const PORT = process.env.PORT || 3000;
const app = express();

const db = require('./models');

if (process.env.NODE_ENV === 'development') {
  const LocalStrategy = require('passport-local').Strategy;
  const username = keys.github.username;
  passport.use(
    new LocalStrategy(function(username, password, done) {
      db.User.findOne(
        {
          github_username: username
        },
        function(err, user) {
          return done(null, user);
        }
      );
    })
  );
} else {
  const GitHubStrategy = require('passport-github').Strategy;
  passport.use(
    new GitHubStrategy(
      {
        clientID: keys.github.id,
        clientSecret: keys.github.secret,
        callbackURL: 'https://47628ed4.ngrok.io/user/auth/github/callback'
      },
      function(accessToken, refreshToken, profile, done) {
        const options = {
          where: {
            github_id: profile.id
          },
          defaults: {
            github_username: profile.username,
            name: profile.displayName,
            avatar: profile._json.avatar_url,
            email: profile._json.email
          }
        };
        db.User.findOrCreate(options)
          .spread((user, created) => done(null, user))
          .catch(err => done(err, null));
      }
    )
  );
}

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.User.findById(id)
    .then(user => done(null, user))
    .catch(err => done(err, null));
});

app.use(
  session({
    secret: keys.sessionSecret
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(require('./controllers'));

app.engine(
  'handlebars',
  expressHandlebars({
    defaultLayout: 'main'
  })
);
app.set('view engine', 'handlebars');

if (process.env.NODE_ENV === 'test') {
  module.exports = db.sequelize
    .sync({
      force: true
    })
    .then(() => app.listen(PORT));
} else {
  db.sequelize
    .sync()
    .then(() =>
      app.listen(PORT, () =>
        console.log(`App running on port ${PORT} at ${Date.now()}`)
      )
    );
}
