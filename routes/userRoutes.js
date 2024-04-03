const router = require('express').Router();

const {signup_post, login_post} = require('../controllers/usercontroller');

router.post('/signup', signup_post);
router.post('/login', login_post);

module.exports = router;