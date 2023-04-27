'use strict';

const {msDb,psPool}  = require("../db/dbconnect");
const db = psPool;
const jwt = require("jsonwebtoken");

const getCats = (req,res) =>{
    const q = 'select * from category';
    db.query(q,(err,data) =>{
        if(err) return res.status(500).json(err);
        // if (data.rows.length ) return 
        res.status(200).json(data.rows);
    })
}

const postCats = (req,res) =>{
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not Authenticated!");
  
    jwt.verify(token, process.env.API_KEY, (err, userInfo) => {
      if (err) return res.status(403).json("Authentication token Not Valid!");
      if(userInfo.id !==2) return res.status(402).json("Not authorized to add category!");
      const q = 'INSERT INTO  category (name,description) VALUES ( $1, $2)';
      db.query(q, [req.body.name, req.body.description], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json('Database error');
        }
        return res.status(200).json("Category created successful");
      });
    });
}

process.env.API_KEY 

const putCat = (req,res) =>{
  console.log(req.body)
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not Authenticated!");
  jwt.verify(token, process.env.API_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Authentication token Not Valid!");
    if(userInfo.id !==2) return res.status(402).json("Not authorized to Modify category!");
    const q = 'UPDATE category set name=$1, description=$2 WHERE catid = $3';
    db.query(q, [req.body.name, req.body.description, req.params.id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json('Database error');
      }
      console.log(result)
      if(result)
      return res.status(200).json("Category updated successfully");
    });
  });
}

 const deleteCats = (req,res) =>{
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not Authenticated!");
  jwt.verify(token, process.env.API_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Authentication token Not Valid!");
    if(userInfo.id !==2) return res.status(402).json("Not authorized to add category!");
    const q = 'DELETE FROM  category WHERE catid = ( $1)';
    db.query(q, [req.params.id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json('Database error');
      }
      return res.status(200).json("Category deleted successful");
    });
  });
}

module.exports = {getCats,postCats,putCat,deleteCats}