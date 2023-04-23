'use strict';
const express = require('express');
const router = express.Router();

const {getCats} = require('../controllers/catController')

router.get('/all',getCats);
router.post('/',getCats);
router.get('/:id',getCats);

module.exports = router;