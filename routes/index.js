const express = require('express')
const router = express.Router()
const app = express()
const Controller = require('../controllers.js/controller');
const login = require('./login')
const logout = require('./logout')
const register = require('./register')
const posts = require('./posts')
const profile = require('./profile')

router.get('/', Controller.renderLandingPage);


router.use(login);
router.use(logout)
router.use(register);

router.use((req,res, next) =>{
    if(req.session.UserId){
        next()
    } else {
        const error = 'Please Login First'
        res.redirect(`/login?error=${error}`)
    }
})

router.use(posts);
router.use(profile);

module.exports = router;