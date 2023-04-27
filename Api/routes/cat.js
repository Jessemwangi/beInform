'use strict';
const express = require('express');
const router = express.Router();

const {getCats,postCats, deleteCats, putCat} = require('../controllers/catController')

router.get('/all',getCats);
router.put('/:id',putCat);
router.post('/',postCats);
router.get('/:id',getCats);
router.delete('/:id',deleteCats);


module.exports = router;