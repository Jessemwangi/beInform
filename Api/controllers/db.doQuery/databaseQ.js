"use strict";

const { db } = require("../../db/dbconnect");

const doQuery = async (sql, parameters) => {
  return new Promise(async (resolve, reject) => {
    try {
      db.query(sql, parameters, (err, data) => {
        console.log(data);
        if (!err){
            if (!data.length) {
              reject("QueryError");
            } else { 
              resolve({ data, resultSet: true });
            }
        }
        else{
            reject("QueryError" + err);
        }
      });
    } catch (err) {
      reject("SQL-error: " + err);
    } finally {
      if (db) db.end();
    }
  });
};

module.exports = { doQuery };
