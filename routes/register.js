const express = require('express')
const router = express.Router()
const Controller = require('../controllers.js/controller')

router.get('/register', Controller.renderRegisterPage);
router.post('/register', Controller.handlerRegisterPage);

module.exports = router