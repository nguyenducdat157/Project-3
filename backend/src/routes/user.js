const express = require('express');
const router = express.Router();
const controller = require('../controller/user');
const { requireSignIn } = require('../middleware');

router.post('/follow/:id', requireSignIn, controller.follow);

router.post('/un-follow/:id', requireSignIn, controller.unFollow);

router.get('/get-user-suggest', requireSignIn, controller.getListUserSuggestion);

router.get('/search/:name', requireSignIn, controller.searchUser);

module.exports = router;
