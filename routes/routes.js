const express = require("express");
const app = express();
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");

router.get("/", HomeController.index);

router.post("/user", UserController.create);

router.get("/user", UserController.index);

router.get("/user/:id", UserController.find);

router.put("/user/:id", UserController.update);

router.delete("/user/:id", UserController.delete);

router.post("/recover-password", UserController.recoverPassword);

router.post("/change-password", UserController.changePassword);

module.exports = router;
