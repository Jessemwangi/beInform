'use strict'
const postRoutes = require('./routes/posts')
const {port,host} = require('./serverConfig.json')
const express = require('express')
const app = express()

app.use(express.json())
// will set the endpot get from ./routes/posts so if we go to dommain/api/post will map to '/' as written in posts.js
app.use('/api/posts',postRoutes); 




app.listen(port,host, () => console.log(`server is listening on port ${port}! and host : ${host}`))


