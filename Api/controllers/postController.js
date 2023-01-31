'use strict'

const db = require('../db/dbconnect')

 const addPost = (req,res) =>{

try {
	const params = [req.body.title,req.body.description,req.body.image,req.body.uid,req.body.CatID];
	  
	    const q = 'insert into posts (`title`,`description`,`image`,`uid`,`CatID`) VALUES (?)'
	db.query(q,[params] ,(err,data) => {
	if(err) return res.json(err)
	return res.status(200).json("transacted successful")
	})
} catch (error) {
	console.log(error);
    res.json(error);
}
    
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