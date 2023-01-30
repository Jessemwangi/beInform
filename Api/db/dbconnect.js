'use strict'
const mysql = require('mysql')
const dbConfigs =require('./dbConfig.json')

 const db =  mysql.createConnection(dbConfigs)
 module.exports = db