'use strict';

const db = require( "../db/dbconnect" );

const getUser =(req, res) =>
{
    const q ="select * from users"
    db.query(q,(err,data) =>
   {
    console.log(data,err);
    if(err) return res.status(500).json(err);
    if (data.length) return res.status(200).json(data);
   } );
    
}

module.exports = {getUser}




