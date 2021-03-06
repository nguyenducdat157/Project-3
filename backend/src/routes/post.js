const express = require('express');
const router = express.Router();
const controller = require('../controller/post');
const { requireSignIn } = require('../middleware');

const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(/\s/g, ''));
  },
});
const upload = multer({ storage });

router.post('/create-post', requireSignIn, upload.array('pictures'), controller.createPost);

router.get('/get-posts', requireSignIn, controller.getPosts);

router.delete('/remove-post/:id', requireSignIn, controller.removePost);

module.exports = router;
