const express = require("express");
const router = express.Router();
const controller = require("../controller/auth");

router.get(
    "/sign-in",
    controller.login
);

module.exports = router;