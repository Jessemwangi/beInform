'use strict';

const { db } = require( "../../db/dbconnect" );

const doQuery = async (sql,parameters) => {

   
        return new Promise(async (resolve,reject)=>{
         
            try{
                let queryResult = await db.query(sql,parameters);
                if(typeof queryResult === 'undefined'){
                    reject('QueryError');
                }
                else if(typeof queryResult.affectedRows==='undefined'){
                    delete queryResult.meta;
                    resolve({queryResult,resultSet:true})
                }
                else{
                    resolve({
                        queryResult:{
                            rowsChanged: queryResult.affectedRows,
                            insertId: queryResult.insertId, 
                            status: queryResult.warningStatus
                        },
                        resultSet:false
                    });
                }
            }
            catch(err){
                reject('SQL-error: '+err);
            }
            finally{
                if(connection) connection.end();
            }
        });
    
    }

    module.exports = {doQuery}


