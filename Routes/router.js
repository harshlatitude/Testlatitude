const express = require("express");
const router = new express.Router();
const controller = require("../Controllers/userController");
const Authentication = require("../middleware/Authentication");


router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/user/auth", Authentication, controller.uservalid);
router.get("/user/logout", Authentication, controller.userlogout);
router.get("/getAlluser",controller.getAlluser);
router.get("/deleteuser/:id",controller.deleteuser);
router.get("/singleuser/:id",controller.singleuser);
router.put("/updateuser/:id",controller.updateuser)


module.exports = router;