const controller = require("../controllers/user");
const { rootUrl } = require("../utility/constants");
const { auth, upload } = require("../utility/global");
const authMiddleware = require("../middleware/authMiddleware");
module.exports = (app) => {
  app.post(rootUrl("register"), controller.register);
  app.post(rootUrl("user-update"), authMiddleware, controller.updateUser);
  // app.post(rootUrl("create-role"), controller.createRole);
  // app.post(rootUrl("sign-in"), controller.signIn);
  // app.post(rootUrl("delete-user"), auth, controller.deleteUser);
  // app.post(rootUrl("forgot-password"), controller.sendForgotPasswordCode);
  // app.post(rootUrl("change-password"), controller.changePassword);
  // app.post(rootUrl("countries"), controller.countrySearch);
  // app.post(rootUrl("loginWithOtp"), controller.loginWithOtp);
  
  // app.post(rootUrl("resendEmailOtp"), controller.resendEmailOtp);
  // app.post(rootUrl("saveSubscriberEmail"), controller.saveSubscriberEmail);
  // app.post(rootUrl("verifyEmailOtp"), controller.verifyEmailOtp);
  // app.post(rootUrl("verify-password"), controller.passwordVerification);
  // app.post(rootUrl("find-Profile-Data"), controller.findProfileData);
  // app.post(
  //   rootUrl("checkSubscriptionState"),
  //   controller.checkSubscriptionState
  // );
  // //checkSubscriptionState
  // app.post(
  //   rootUrl("update-user-profile"),
  //   auth,
  //   upload.fields([
  //     { name: "avatar", maxCount: 1 },
  //     { name: "banner", maxCount: 1 },
  //   ]),
  //   controller.updateProfile
  // );
  // app.post(rootUrl("userInfo"), auth, controller.findUserInfo);

 
};
