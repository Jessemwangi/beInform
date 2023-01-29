'use strict';

const express = require('express');
const { getauth,regUser,login,logout } = require( '../controllers/authController' );
const router = express.Router()

router.get('/',getauth)

router.post('/register',regUser)
router.post('/login',login)
router.post('/logout',logout)
module.exports = router