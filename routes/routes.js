const express = require("express");
const app = express();
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");
const AdminAuth = require("../middleware/AdminAuth");

router.post("/user", UserController.create);

router.get("/user", AdminAuth, UserController.index);

router.get("/user/:id", AdminAuth, UserController.find);

router.put("/user/:id", AdminAuth, UserController.update);

router.delete("/user/:id", AdminAuth, UserController.delete);

router.post("/recover-password", UserController.recoverPassword);

router.post("/change-password", UserController.changePassword);

router.post("/login", UserController.login);

module.exports = router;
