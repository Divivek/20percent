/**
 * module dependencies for passport configuration
 */
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

// controllers
const getUser = require('./entities/user/controller').getUser;
const signInViaGithub = require('./entities/user/controller').signInViaGithub;
const signInViaTwitter = require('./entities/user/controller').signInViaTwitter;
const signInViaFacebook = require('./entities/user/controller').signInViaFacebook;

// create credentials
const FB_APPID = require('../config/credentials').FB_APPID;
const FB_CBURL = require('../config/credentials').FB_CBURL;
const FB_FIELDS = require('../config/credentials').FB_FIELDS;
const FB_SECRET = require('../config/credentials').FB_SECRET;

// create credentials
const TW_APPID = require('../config/credentials').TW_APPID;
const TW_CBURL = require('../config/credentials').TW_CBURL;
const TW_SECRET = require('../config/credentials').TW_SECRET;

// create credentials
const GH_APPID = require('../config/credentials').GH_APPID;
const GH_CBURL = require('../config/credentials').GH_CBURL;
const GH_SECRET = require('../config/credentials').GH_SECRET;

/**
 * passport configuration
 */
const passportConfig = (app) => {
  
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    // try/catch
    try {
      // get user
      const user = await getUser(id);

      // check user
      done(null, user);
    } catch (e) {
      done(e);
    }
  });

  // create facebook
  if (FB_APPID && FB_SECRET) {
    // create new facebook strategy
    passport.use(new FacebookStrategy({
      clientID: FB_APPID,
      callbackURL: FB_CBURL,
      clientSecret: FB_SECRET,
      profileFields: FB_FIELDS,
    }, async (accessToken, refreshToken, profile, done) => {

      // try/catch
      try {
        // get user
        const user = await signInViaFacebook(profile);

        // check user
        console.log('got the user'); done(null, user);
      } catch (e) {
        console.log('something error occurs'); done(error);
      }
    }));
  }

  // create twitter
  if (TW_APPID && TW_SECRET) {
    // create new twitter strategy
    passport.use(new TwitterStrategy({
      consumerKey: TW_APPID,
      callbackURL: TW_CBURL,
      consumerSecret: TW_SECRET,
    }, async (accessToken, refreshToken, profile, done) => {

      // try/catch
      try {
        // get user
        const user = await signInViaTwitter(profile);

        // check user
        console.log('got the user'); done(null, user);
      } catch (e) {
        console.log('something error occurs'); done(error);
      }
    }));
  }

  // create github
  if (GH_APPID && GH_SECRET) {
    // create new twitter strategy
    console.log("Going for git hub")
    passport.use(new GitHubStrategy({
      scope: 'user:email',
      clientID: GH_APPID,
      clientSecret: GH_SECRET,
      callbackURL: GH_CBURL,
    }, async (accessToken, refreshToken, profile, done) => {

      // try/catch
      try {
        // get user
        const user = await signInViaGithub(profile);

        // check user
        console.log('got the user'); done(null, user);
      } catch (e) {
        console.log('something error occurs'); done(error);
      }
    }));
  }
};

module.exports = passportConfig;
