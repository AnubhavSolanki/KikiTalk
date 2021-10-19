const connection = require("./index");

const runQuery = (sql,params = [])=>{
    return new Promise((resolve,reject) => {
        console.log(`querying : ${sql.replace("?",params.join(','))}`);
        connection.query(sql,params,(error,result)=>{
            if(error){
                reject(error);
            } 
            resolve(result);
        })
    })
}

module.exports = runQuery;
