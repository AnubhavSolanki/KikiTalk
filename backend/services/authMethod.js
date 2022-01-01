const user = require("../database/models/user/user");

const verifyLoginDetails = async (email, password) => {
    try {
        const [data] = await user.find({ user_email: email }).exec();
        var originalPassword = data.password;
        if (originalPassword != password) {
            throw new Error("Wrong Password");
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    verifyLoginDetails
}