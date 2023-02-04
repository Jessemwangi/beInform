'use strict';
const express = require('express');
const router = express.Router();

const {getCats} = require('../controllers/catController')

router.get('/all',getCats);

module.exports = router;