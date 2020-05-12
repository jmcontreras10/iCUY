"use strict";
var passport = require("passport");
var Strategy = require("passport-local").Strategy;
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const fetchFilter = require("./model/user").fetchFilter;
const createUser = require("./controllers/users").create;
const crypto = require("crypto");
const envGClient = process.env.GOOGLE_CLIENT;
const envGSecret = process.env.GOOGLE_SECRET;
const envPSecret = process.env.PASSPORT_SECRET;

passport.use(new Strategy(function (username, password, cb) {
  fetchFilter(username).then(users => {
    const user = users.length > 0 ? users[0] : undefined;
    const hash = crypto.createHash("sha256");
    hash.update(password);
    if (user && user.password == hash.digest("hex")) {
      return cb(null, user.email);
    }
    else if(user && user.password == null){
      return cb(null, false)
    }
    return cb(null, false);
  });
  // fetchFilter(username).then(users => {
  //   const user = users.length > 0 ? users[0] : undefined;
  //   const hash = crypto.createHash("sha256");
  //   hash.update(password);
  //   if (user && user.password == hash.digest("hex")) {
  //     return cb(null, user.email);
  //   }
  //   else if (user && user.password == null) {
  //     return cb("Logeate usando Google")
  //   }
  //   return cb("El correo o la contraseña estan errados");
  // });
})
);

passport.use(new GoogleStrategy({
  clientID: envGClient,
  clientSecret: envGSecret,
  callbackURL: "https://icuy.herokuapp.com/auth/google/callback"
},
async function (accessToken, refreshToken, profile, cb) {
  let user = profile["_json"];
  return await fetchFilter(user.email).then(async users => {
    if (users.length > 0) {
      return cb(null, user.email);
    }
    else {
      let data = {
        name: user.name,
        email: user.email,
        photo: user.picture,
        isGoogle:true
      };
      return await createUser(data).then(() => {
        return cb(null, user.email);
      }).catch(err=>{          
        return cb(err);
      });
    }
  });
}
));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (username, cb) {

  fetchFilter(username).then(users => {
    const user = users.length > 0 ? users[0] : undefined;
    if (user) {
      let res = { ...user };
      res.password = undefined;
      return cb(null, res);
    }
    return cb(new Error("user not found"));
  });

});

const configurePassport = (app) => {
  app.use(require("body-parser").urlencoded({ extended: true }));
  app.use(require("express-session")({
    secret: envPSecret,
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
};

module.exports = configurePassport;