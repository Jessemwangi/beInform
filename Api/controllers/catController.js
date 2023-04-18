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

module.exports = {getCats}