const express = require("express");
const router = express.Router();
const controller = require("../controller/auth");

router.post(
    "/sign-in",
    controller.signIn
);

router.post(
    "/sign-up",
    controller.signUp
);

router.post("/replace-password", controller.replacePassword);

module.exports = router;