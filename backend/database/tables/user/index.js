const runQuery = require("../../engine");

const create = async () => {
    const sql = `CREATE TABLE IF NOT EXISTS users (
        id INT NOT NULL AUTO_INCREMENT,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        user_email VARCHAR(255) UNIQUE NOT NULL,
        user_DOB DATE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created DATETIME NOT NULL DEFAULT now(),
        updated DATETIME NOT NULL DEFAULT now() ON UPDATE now(),
        PRIMARY KEY (id)
    )`;
    try{
        await runQuery(sql,[]);
    }catch(error){
        throw error;
    }
}

const addUser = async (body) => {
    const sql = `INSERT INTO users(${Object.keys(body).join()}) VALUES(?)`;
    try{
        await runQuery(sql,[Object.values(body)]);
    }catch(error){
        throw error;
    }
}

module.exports = {
    create,
    addUser
};

