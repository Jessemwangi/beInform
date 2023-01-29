'use strict'
const {port,host} = require('./serverConfig.json')
const express = require('express')
const app = express()
app.use(express.json())

const postRoutes = require('./routes/posts')
const userRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')

// will set the endpot get from ./routes/posts so if we go to dommain/api/post will map to '/' as written in posts.js
app.use('/api/posts',postRoutes); 
app.use('/api/users',userRoutes);
app.use('/api/auth',authRoutes);




app.listen(port,host, () => console.log(`server is listening on port ${port}! and host : ${host}`))


