const routes = require("express").Router();
const userController = require("../controllers/UserController");

routes.get("/users", userController.getAllUsers);
// routes.post("/user", userController.addUsers);
//routes.post("/user", userController.signUp);
routes.post("/user", userController.addUserWithFile);
routes.delete("/user/:id", userController.deleteUser);
routes.get("/user/:id", userController.getUserById);
routes.post("/user/login", userController.LoginUser);
routes.post("/user/forgotpassword", userController.forgotPassword);
routes.post("/user/resetpassword", userController.resetpassword);

module.exports = routes;
