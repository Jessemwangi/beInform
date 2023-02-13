
const MSQLDbConfigs ={
host:process.env.MSQHOST,
port:+process.env.MSQPORT,
user:process.env.MSQUSER,
password:process.env.MSQPASSWORD,
database:process.env.MSQDATABASE,
allowPublicKeyRetrieval: true

}


 const PSQLDbConfigs = {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: +process.env.PGPORT,
    
}

module.exports = {MSQLDbConfigs,PSQLDbConfigs}