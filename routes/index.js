const express = require('express')
const router = express.Router()
const Controller = require('../controllers.js/controller');
const login = require('./login')
const register = require('./register')
const posts = require('./posts')
const profile = require('./profile')

router.get('/', Controller.renderLandingPage);

router.use(login);
router.use(register);
router.use(posts);
router.use(profile);

module.exports = router;