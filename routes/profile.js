const express = require('express')
const router = express.Router()
const Controller = require('../controllers.js/controller')

router.get('/profile/:id/edit', Controller.renderEditProfile);
router.post('/profile/:id/edit', Controller.handlerEditProfile);
router.get('/profile/:id', Controller.getProfileById);
router.get('/profile/:id/posts/add', Controller.renderAddPost);
router.post('/profile/:id/posts/add', Controller.handlerAddPost);

module.exports = router;