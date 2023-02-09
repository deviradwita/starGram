const express = require('express')
const router = express.Router()
const Controller = require('../controllers.js/controller')

router.get('/registerUser', Controller.renderRegisterUserPage);
router.post('/registerUser', Controller.handlerRegisterUserPage);
router.get('/registerProfile/:id', Controller.renderRegisterProfilePage);
router.post('/registerProfile/:id', Controller.handlerRegisterProfilePage);

module.exports = router