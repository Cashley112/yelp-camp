const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');

const passport = require('passport');
const LocalStrategy = require('passport-local');

const users = require('../controllers/users');

router.get('/register', users.renderRegisterForm);
router.post('/register', catchAsync(users.createUser));

router.get('/login', users.renderLoginForm);
router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);

router.get('/logout', users.logout)

module.exports = router;