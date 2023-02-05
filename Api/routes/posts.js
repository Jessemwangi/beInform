'use strict'
const express = require('express');
const {addPost,getPosts,getPost,deletePost,putPost,updatePost } = require( '../controllers/postController' );

const router = express.Router()


router.get('/all', getPosts)
router.get('/:id', getPost)
router.post('/', addPost)
router.delete('/:id', deletePost)
router.put('/:id', putPost)
// router.get('/dum/all', dummyget)

// app.post('/', function (req, res) {
//   res.send('POST request to the homepage')
// })

module.exports = router;