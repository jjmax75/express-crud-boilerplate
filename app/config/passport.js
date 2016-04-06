'use strict';

var User = require('../models/users.js');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy(function(username, password, done) {
    process.nextTick(function() {

      User.findOne({
        'username': username
      }, function(err, user) {
        if (err) {
          console.error(err);
        }

        if (!user) {
          return done(null, false);
        }

        if (user.password != password) {
          return done(null, false);
        }

        return done(null, user);
      });
    });
  }));

};
