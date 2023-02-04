'use strict'
const {port,host} = require('./serverConfig.json')
const express = require('express')
const cookieparser = require('cookie-parser')

const app = express()

app.use(express.json())
app.use(cookieparser())

const postRoutes = require('./routes/posts')
const userRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')
const catRoutes = require('./routes/cat')

// will set the endpot get from ./routes/posts so if we go to dommain/api/post will map to '/' as written in posts.js
app.use('/api/posts',postRoutes); 
app.use('/api/users',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/cat',catRoutes);




app.listen(port,host, () => console.log(`server is listening on port ${port}! and host : ${host}`))


