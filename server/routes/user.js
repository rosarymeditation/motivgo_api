const controller = require("../controllers/user");
const { rootUrl } = require("../utility/constants");
const { auth, upload } = require("../utility/global");
const authMiddleware = require("../middleware/authMiddleware");
module.exports = (app) => {
  app.post(rootUrl("register"), controller.register);
  app.post(rootUrl("login"), controller.login);
  app.post(rootUrl("user-update"), authMiddleware, controller.updateUser);
  
};
