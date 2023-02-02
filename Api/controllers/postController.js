'use strict'

const db = require('../db/dbconnect')
const jwt = require('jsonwebtoken')
 const addPost = (req,res) =>{

try {
	const params = [req.body.title,req.body.description,req.body.image,req.body.uid,req.body.CatID];
	  
	    const q = 'insert into posts (`title`,`description`,`image`,`uid`,`CatID`) VALUES (?)'
	db.query(q,[params] ,(err,data) => {
	if(err) return res.status(500).json(err)
	return res.status(200).json("transacted successful")
	})
} catch (error) {
	console.log(error);
    res.json(error);
}
    
}

const getPosts = (req,res) =>{
   const q = req.query.cat ? 
   "select p.id,p.title,p.description,p.image,p.uid,p.CatID,p.datecreated, u.id as userID,u.username,u.image as userImage,c.catId,c.name as category from posts p join category c on p.CatID = c.catId join users u on u.id=p.uid where c.name = ? order by p.id Desc"
    : 
    "select p.id,p.title,p.description,p.image,p.uid,p.CatID,p.datecreated, u.id as userID,u.username,u.image as userImage,c.catId,c.name as category from posts p join category c on p.CatID = c.catId join users u on u.id=p.uid order by p.id Desc"


     db.query(q,req.query.cat, (err,data) =>{
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(200).json(data);
     })

    }
const getPost = (req,res) =>{
    const q =  "select p.id,p.title,p.description,p.image,p.uid,p.CatID,p.datecreated, u.id as userID,u.username,u.image as userImage,c.catId,c.name as category from posts p join category c on p.CatID = c.catId join users u on u.id=p.uid where p.id = ? order by p.id Desc"
    db.query(q,req.params.id, (err,data) =>{
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(200).json(data[0]);
     })
    
}

const deletePost = (req,res) =>{
    const token =req.cookies.access_token
    if (!token) return res.status(401).json('Not Authenticated!');

    jwt.verify(token,'jwtkey', (err, userInfo) =>{
        if (err) return res.status(403).json('Token Not Valid!')
    
    const q = 'delete from posts where id = ? and uid = ?';
    db.query(q,[req.params.id,userInfo.id], (err, data) => {
        if(err) return res.status(403).json('You can delete only you post!');
        res.status(200).json('Post Deleted!');
    })
    })
}
const putPost = (req,res) =>{
    res.json('GET request to the homepage')
}
const updatePost = (req,res) =>{
    res.json('GET request to the homepage')
}
module.exports ={addPost,getPosts,getPost,deletePost,putPost,updatePost}