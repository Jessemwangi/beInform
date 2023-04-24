"use strict";
const { port, host } = require("./serverConfig.json");
const express = require("express");
const cookieparser = require("cookie-parser");
const multer = require("multer");
const cors = require("cors");

const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const catRoutes = require("./routes/cat");
const postGresRoute = require("./routes/postgres");
const { uploadFile, deleteFile } = require( "./utilities/utilities" );


const app = express();
// require("dotenv").config();
app.use(express.json());
app.use(cookieparser());

const allowedOrigins = [
  "https://beinformed.onrender.com",
  "https://blogapi-j5mi.onrender.com",
  "http://localhost:3001", "http://localhost:3000",
  "http://localhost:3003",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


app.get('/', (req, res) => res.send('Hello World!'))

const storage = multer.memoryStorage();
const upload = multer({ storage });

// will set the endpot get from ./routes/posts so if we go to dommain/api/post will map to '/' as written in posts.js
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cat", catRoutes);
app.use("/api/postgres", postGresRoute);


app.post("/api/upload/posts/images", upload.single("file"),uploadFile);

app.delete("/api/delete/img/:name", async (req, res) =>{
  const filename = req.params.name
  console.log(filename)
  try {
     await deleteFile(filename)
     res.status(200).json(`${filename}  Deleted`);
  } catch (error) {
    res.status(500).json('Error Deleting File')
    console.log(error)
  }
 
});

app.listen(process.env.PORT ? parseInt(process.env.PORT) : port, host, () =>
  console.log(`server is listening on port ${port}! and host : ${host}`)
);

module.exports = app;