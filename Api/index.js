'use strict'
const {port,host} = require('./serverConfig.json')
const express = require('express')
const cookieparser = require('cookie-parser')
const multer  = require('multer')

const app = express()

app.use(express.json())
app.use(cookieparser())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../clientpoint/public/posts/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + file.originalname)
    }
  }) 

const upload = multer({ storage }) 

const postRoutes = require('./routes/posts')
const userRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')
const catRoutes = require('./routes/cat')


// will set the endpot get from ./routes/posts so if we go to dommain/api/post will map to '/' as written in posts.js
app.use('/api/posts',postRoutes); 
app.use('/api/users',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/cat',catRoutes);


app.post('/api/upload/posts/images', upload.single('file'), function (req, res){
console.log(req.file)
const file = req.file;
    try {
	res.status(200).json(file.filename)
} catch (error) {
	console.log(error);
    res.status(500).json(error);
}
     
  })


app.listen(port,process.env.PORT || host, () => console.log(`server is listening on port ${port}! and host : ${host}`))


