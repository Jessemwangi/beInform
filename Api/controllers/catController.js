'use strict';

const {msDb,psPool}  = require("../db/dbconnect");
const db = psPool;
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
  
    jwt.verify(token, "s3cr3t", (err, userInfo) => {
      if (err) return res.status(403).json("Authentication token Not Valid!");
      db.query(q, params, (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Database error" });
        }
        return res.status(200).json("post updated successful");
      });
    });
    
    const q = 'select * from category';
    db.query(q,(err,data) =>{
        if(err) return res.status(500).json(err);
        // if (data.rows.length ) return 
        res.status(200).json(data.rows);
    })
}

const putCats = (req,res) =>{
    const q = 'select * from category';
    db.query(q,(err,data) =>{
        if(err) return res.status(500).json(err);
        // if (data.rows.length ) return 
        res.status(200).json(data.rows);
    })
}
module.exports = {getCats,postCats,putCats}