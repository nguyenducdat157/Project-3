const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.requireSignIn = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, process.env.JWT_SECRET); // submit token to show profile
    req.user = user;
  } else {
    return res.status(400).json({ message: 'Authorization required' });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if(req.user.role === 1) {
    next()
  }
  else {
    return res.status(403).json({
      message: 'You are not admin'
    })
  }
}