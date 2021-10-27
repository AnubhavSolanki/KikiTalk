const connection = require(".");
const { database } = require("./dbAuth");
const user = require('../database/tables/user');

const createDatabase = ()=>{
    var sql = `CREATE DATABASE IF NOT EXISTS ${database}`;
    connection.query(sql,(error,res) => {
        if(error) reject(error);
        connection.query(`USE ${database}`,(error,result) => {
            if(error) reject(error);
            return result;
        })
    })
}

const createAllTables = async () => {
    try{
        await createDatabase();
        console.log("Database Created...");
        console.log("Creating Tables..."); 
        await user.create();
        console.log("User Table Created...");
    }
    catch(error){
        throw error;
    }
}

createAllTables();
