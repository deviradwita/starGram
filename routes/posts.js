const express = require('express')
const router = express.Router()
const Controller = require('../controllers.js/controller')


router.get('/posts', Controller.renderPost);

// router.get('/posts/add', Controller.renderAddPost);
// router.post('/posts/add', Controller.handlerAddPost);

// router.get('/posts/:id', Controller.getPostById);
router.get('/posts/:id/edit', Controller.renderEditPost);
router.post('/posts/:id/edit', Controller.handlerEditPost);

router.get('/posts/:id/delete', Controller.deletePost);

module.exports = router
