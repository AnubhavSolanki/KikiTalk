const { getPasswordByEmail } = require("../database/tables/user")

const verifyLoginDetails = async (email,password) => {
    try{
        var originalPassword = await getPasswordByEmail(email);
        if(originalPassword != password){
            throw new Error("Wrong Password");
        }
    }catch(error){
        throw error;
    }
}

module.exports = {
    verifyLoginDetails
}