const express = require('express')
const router = express.Router()
const Controller = require('../controllers.js/controller')

router.get('/profile/:id', Controller.getProfileById);

module.exports = router;