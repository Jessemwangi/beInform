'use strict';

const  {psPool} = require( "../db/dbconnect" );

const getUser =(req, res) =>
{
    const q ="select * from users"
    psPool.query(q,(err,data) =>
   {
    if(err) return res.status(500).json(err);
    if (data.length) return res.status(200).json(data.rows);
   } );
    
}

module.exports = {getUser}




