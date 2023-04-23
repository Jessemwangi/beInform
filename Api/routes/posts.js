'use strict'
const express = require('express');
const {addPost,getPosts,getPost,deleteData,putPost,updatePost } = require( '../controllers/postController' );

const router = express.Router()


router.get('/all', getPosts)
router.get('/:id', getPost)
router.post('/', addPost)
router.delete('/:id', deleteData)
router.put('/:id', putPost)
// router.get('/dum/all', dummyget)

router.get('/', function (req, res) {
  res.send('POST request to the homepage')
})

module.exports = router;