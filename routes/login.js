const express = require('express')
const router = express.Router()
const Controller = require('../controllers.js/controller')

router.get('/login', Controller.renderLoginPage);
router.post('/login', Controller.handlerLoginPage);

module.exports = router;