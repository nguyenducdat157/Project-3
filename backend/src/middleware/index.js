
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.requireSignin = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization;
        const user = jwt.verify(token, process.env.JWT_SECRET); // submit token to show profile
        req.user = user;
    } else {
        return res.status(400).json({ message: "Authorization required" });
    }
    next();
};