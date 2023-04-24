'use strict';
const express = require('express');
const router = express.Router();

const {getCats,postCats, deleteCats} = require('../controllers/catController')

router.get('/all',getCats);
router.post('/',postCats);
router.get('/:id',getCats);
router.delete('/:id',deleteCats);


module.exports = router;