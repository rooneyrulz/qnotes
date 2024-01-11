const passport = require("passport");
const loginLimiter = require("./loginLimiter");

// Middleware for authentication
const authenticate = (strategy, scope) => (req, res, next) => {
  passport.authenticate(strategy, { scope })(req, res, next);
};

// Middleware for handling authentication callbacks
const handleCallback = (strategy, callback) => (req, res, next) => {
  passport.authenticate(strategy, {
    failureRedirect: `${process.env.CLIENT_URL_DEV}/login`,
    session: false,
  })(req, res, () => {
    loginLimiter(req, res, () => {
      callback(req, res, next);
    });
  });
};

module.exports = { authenticate, handleCallback };
