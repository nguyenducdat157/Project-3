const express = require('express');
const router = express.Router();
const controller = require('../controller/user');
const { requireSignIn } = require('../middleware');

router.post('/follow/:id', requireSignIn, controller.follow);

module.exports = router;
