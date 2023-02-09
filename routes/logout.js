const express = require('express')
const router = express.Router()
const Controller = require('../controllers.js/controller')

router.get('/logout', Controller.userLogOut);

module.exports = router;