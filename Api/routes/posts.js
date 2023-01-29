'use strict'
const express = require('express');
const { addPost } = require( '../controllers/postController' );

const router = express.Router()


router.get('/', addPost)

// app.post('/', function (req, res) {
//   res.send('POST request to the homepage')
// })

module.exports = router;