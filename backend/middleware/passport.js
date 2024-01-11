const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const { Strategy: GitHubStrategy } = require("passport-github2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const handleOAuthLogin = async (provider, profile, done) => {
  const username = profile.emails ? profile.emails[0].value : null;
  const providerId = profile.id;
  const temporaryPassword = "12345678";

  try {
    let user = await User.findOne({
      $and: [{ [`${provider}Id`]: providerId }, { username }],
    });

    if (!user) {
      const hashedPwd = await bcrypt.hash(temporaryPassword, 10);
      user = new User({
        username,
        [`${provider}Id`]: providerId,
        password: hashedPwd, // Temporary password
      });
      await user.save();
    }

    // When user created by admin/manager with email & password then user login with the OAuth account which is associated with the same email address.
    if (!user[`${provider}Id`]) {
      user[`${provider}Id`] = providerId;
      user.save();
    }

    if (!user.active)
      return done(null, false, { message: "User is not active" });

    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: user.username,
          roles: user.roles || ["Employee"],
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { username: user.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    user.tokens = { accessToken, refreshToken };

    return done(null, user);
  } catch (error) {
    return done(error);
  }
};

const googleAuthStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    await handleOAuthLogin("google", profile, done);
  }
);

const githubAuthStrategy = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    await handleOAuthLogin("github", profile, done);
  }
);

module.exports = { googleAuthStrategy, githubAuthStrategy };
