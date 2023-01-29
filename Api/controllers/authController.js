'use strict';

const { doQuery } = require( "./db.doQuery/databaseQ" );



const getauth = (req,res) =>{
    res.json('this is auth get');
}

const regUser = async (req,res) => {

    // what to do, validate data and user exist
    const q ='select * from users where email = ? or username = ?'
  const params = [req.body.email,req.body.username]
 const result =  doQuery(q,params);

 if (result.queryResult > 0){
     return res.status(409).json('You Already have an account')
 }


}

const login = (req,res)=>{

}
const logout = (req,res)=>{

}
module.exports = {getauth,regUser,login,logout}