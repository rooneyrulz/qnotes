const express = require("express");
const authController = require("../controllers/authController");
const loginLimiter = require("../middleware/loginLimiter");
const { authenticate, handleCallback } = require("../middleware/oauth");

const router = express.Router();

router.route("/").post(loginLimiter, authController.login);
router.route("/refresh").get(authController.refresh);
router.route("/logout").post(authController.logout);

// Google authentication routes
router.route("/google").get(loginLimiter, authenticate("google", ["profile", "email"]));
router
  .route("/google/callback")
  .get(handleCallback("google", authController.googleLogin));

// GitHub authentication routes
router.route("/github").get(loginLimiter, authenticate("github", ["user:email"]));
router
  .route("/github/callback")
  .get(handleCallback("github", authController.githubLogin));

module.exports = router;












// Social routes configuration backup

// router
//   .route("/google")
//   .get(
//     loginLimiter,
//     passport.authenticate("google", { scope: ["profile", "email"] })
//   );

// router.route("/google/callback").get(
//   passport.authenticate("google", {
//     failureRedirect: `${process.env.CLIENT_URL_DEV}/login`,
//     session: false,
//   }),
//   loginLimiter,
//   authController.googleLogin
// );

// router
//   .route("/github")
//   .get(
//     loginLimiter,
//     passport.authenticate("github", { scope: ["user:email"] })
//   );

// router
//   .route("/github/callback")
//   .get(
//     passport.authenticate("github", {
//       failureRedirect: `${process.env.CLIENT_URL_DEV}/login`,
//       session: false,
//     }),
//     loginLimiter,
//     authController.githubLogin
//   );
