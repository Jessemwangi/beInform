'use strict'
const {port,host} = require('./serverConfig.json')
const express = require('express')
const cookieparser = require('cookie-parser')
const multer  = require('multer')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cookieparser())

const whitelist = ['https://beinformed.onrender.com', 'http://localhost:3000','http://localhost:3003'];
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};
app.use(cors(corsOptions))

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
require('dotenv').config();

const postRoutes = require('./routes/posts')
const userRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')
const catRoutes = require('./routes/cat')
const postGresRoute = require('./routes/postgres')


// will set the endpot get from ./routes/posts so if we go to dommain/api/post will map to '/' as written in posts.js
app.use('/api/posts',postRoutes); 
app.use('/api/users',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/cat',catRoutes);
app.use('/api/postgres',postGresRoute)


app.post('/api/upload/posts/images', upload.single('file'), function (req, res){

const file = req.file;
    try {
	res.status(200).json(file.filename)
} catch (error) {

    res.status(500).json(error);
}
     
  })

  app.delete('/products/:id', function(req, res) {
    const { id } = req.params;
    res.send(`Delete record with id ${id}`);
  });

app.listen(process.env.PORT ? parseInt(process.env.PORT) : port, host, 
() => console.log(`server is listening on port ${port}! and host : ${host}`))


