"use strict";

const  {msDb ,psPool,psDb} = require("../db/dbconnect");
const db = psPool;
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const getauth = (req, res) => {
  res.json("this is auth get");
};

const regUser = (req, res) => {
  // what to do, validate data and user exist
  const q = "select * from users where email = $1 or username = $2";

  const params = [req.body.email, req.body.username];
try {
   psPool.query(q, params, (err, data) => {
    if (err) return res.status(500).json(err);
    console.log(data)
    if (data.rows.length) 
    {
      return res.status(409).json("Account already in use!!");
    }
       /// password
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    const in_q = "INSERT INTO users (email, username, password) VALUES ($1, $2, $3)";
    // 'insert into users (`email`,`username`,`password`,`id`) values (`kips@gmail.com`,`kips@gmail.com`,`$2a$10$sC4XvXGl/D1gvPzTEJQTzuJXsQTi/G4DqPOJQ2tKCon9HBXtZFGL6`,1)'
    const instParams = [...params, hash];
    console.log(instParams)
    psPool.query(in_q, instParams, (err, data) => {
      if (err){
        console.log(err) 
        return res.status(500).json(err);
      }
      return res.status(200).json(req.body.username + " has been create");
    });
  });
  
} catch (error) {
  console.log(error)
}

};

const login = (req, res) => {
  try {
    const q = "select * from users where username = $1";
    if(!req.body)
    {return res.status(204).json('empty username and password provided')}
    
      const params = [req.body.username];
    
      db.query(q,params, (err,data) =>{
        if (err) return res.status(500).json(err)
        if (data.rowCount === 0) return res.status(404).json('user not found');
        // Checking for matching hashed passsword
        const isValidPassword = bcrypt.compareSync(req.body.password, data.rows[0].password);
        if (!isValidPassword){ return res.status(403).json('Wrong username or password');}
    const token = jwt.sign({id:data.rows[0].id},"s3cr3t");
    console.log(token)
    const {password,...other} = data.rows[0];
    
    res.cookie("access_token",token,{
        httpOnly:true,
        secure:true,
        sameSite: 'none'
    
    }).status(200).json(other)
    
      })
  } catch (error) {
    res.status(500).json(error.message)
    console.log(error)
  }

};
 
const logout = (req, res) => {
  res.clearCookie("access_token",{
    sameSite:"none",
    secure:true,
    httpOnly:true,

  }).status(200).json("user logout")
};

const testing = (req, res) => {
  res.status(200).json('hello');
}


module.exports = { getauth, regUser, login, logout,testing };
