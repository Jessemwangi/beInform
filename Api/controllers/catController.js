'use strict';

const {msDb}  = require("../db/dbconnect");
const db = msDb;
const getCats = (req,res) =>{
    const q = 'select * from category';
    db.query(q,(err,data) =>{
        if(err) return res.status(500).json(err);
        if (data.length) return res.status(200).json(data);
    })
}

module.exports = {getCats}