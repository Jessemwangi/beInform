'use strict';

const db = require( "../db/dbconnect" );
const { doQuery } = require( "./db.doQuery/databaseQ" );
const bcrypt = require('bcryptjs');



const getauth = (req,res) =>{
    res.json('this is auth get');
}

const regUser =  (req,res) => {

    // what to do, validate data and user exist
    const q ='select * from users where email = ? or username = ?'
   
  const params = [req.body.email,req.body.username]

 const result =  db.query(q,params, (err,data) =>{
    if (err) return res.json(err);
    if(data.length) return res.status(200).json('employee already in use!!');

    /// password
    var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync(req.body.password, salt);
const in_q = "insert into users (`email`,`username`,`password`) values (?,?,?)";

// 'insert into users (`email`,`username`,`password`,`id`) values (`kips@gmail.com`,`kips@gmail.com`,`$2a$10$sC4XvXGl/D1gvPzTEJQTzuJXsQTi/G4DqPOJQ2tKCon9HBXtZFGL6`,1)'
const instParams = [...params , hash]
console.log(in_q,instParams );

db.query(in_q,instParams, (err,data) =>{
    if (err) return res.json("insert Errro occured"  + err);
    return res.status(200).json(req.body.username + ' has been create')
})

 });

console.log(result);

//  if (result.queryResult > 0){
//      return res.status(409).json('You Already have an account!')
//  }


}

const login = (req,res)=>{

}
const logout = (req,res)=>{

}
module.exports = {getauth,regUser,login,logout}