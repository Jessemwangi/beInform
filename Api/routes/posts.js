'use strict'
const express = require('express')

const router = express.Router()


router.get('/', (req, res) => {
  res.json('GET request to the homepage')
})

// app.post('/', function (req, res) {
//   res.send('POST request to the homepage')
// })

module.exports = router;