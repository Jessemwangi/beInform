'use strict'

const db = require('../db/dbconnect')

 const addPost = (req,res) =>{
    const q = 'select * from posts'
db.query(q,(err,data) =>{

})
    res.json('GET request to the homepage')
}

const getPosts = (req,res) =>{
   const q = req.query.cat ? 
   "select * from posts p join category c on p.CatID = c.catId where p.id = ? order by p.id Desc"
    : 
     "select * from posts p join category c on p.CatID = c.catId order by p.id Desc"

     db.query(q,req.query.cat, (err,data) =>{
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(200).json(data);
     })

    }
const getPost = (req,res) =>{
    res.json('GET request to the homepage')
}
const deletePost = (req,res) =>{
    res.json('GET request to the homepage')
}
const putPost = (req,res) =>{
    res.json('GET request to the homepage')
}
const updatePost = (req,res) =>{
    res.json('GET request to the homepage')
}
module.exports ={addPost,getPosts,getPost,deletePost,putPost,updatePost}