const express = require('express')
const getTest = require( '../controllers/postgreTestController' )
const router = express.Router()




router.get('/test/sql', (req,res) =>{
    const q='select * from users';
    psPool.query(q,(err,data) =>{
        if(err) {
            console.log('ERRoR',err)
            res.status(500).json(err)
        }
        else{
            res.status(200).json(data.rows);

        }
        
    })
    psPool.end(()=>console.log('connection end'))
})

module.exports = router;