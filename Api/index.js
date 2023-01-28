'use strict'
const {port,host} = require('./serverConfig.json')

const express = require('express')
const app = express()


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port,host, () => console.log(`server is listening on port ${port}! and gost : ${host}`))


app.listen( )