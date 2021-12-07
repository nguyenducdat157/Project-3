const express = require('express');
const router = express.Router();
const controller = require('../controller/user');
const { requireSignIn, isAdmin } = require('../middleware');

router.post('/follow/:id', requireSignIn, controller.follow);

router.post('/un-follow/:id', requireSignIn, controller.unFollow);

router.get('/get-user-suggest', requireSignIn, controller.getListUserSuggestion);

router.get('/get-all-suggest', requireSignIn, controller.allUserSuggest);

router.get('/search', requireSignIn, controller.searchUser);

router.get('/get-all-follower', requireSignIn, controller.getAllUserFollower);

router.get('/get-all-following', requireSignIn, controller.getAllUserFollowing);

router.get('/get-all', requireSignIn, isAdmin, controller.getAllUser);

router.post('/block/:id', requireSignIn, isAdmin, controller.BlockUser);

router.post('/un-block/:id', requireSignIn, isAdmin, controller.UnBlockUser);

module.exports = router;
