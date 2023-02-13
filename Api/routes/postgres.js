const express = require('express')
const getTest = require( '../controllers/postgreTestController' )
const router = express.Router()




router.get('/test/sql', getTest)

module.exports = router;