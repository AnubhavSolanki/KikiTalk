const user = require("../database/models/user");
const { printError, printSuccess } = require("../services/coloredPrint");

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


const login = async (req, res) => {
    try {
        await verifyLoginDetails(req.body.email, req.body.password);
        printSuccess("Logged In Successfully");
        res.status(200).send("logged in");
    } catch (error) {
        printError(error.message);
        res.status(404).send(error.message);
    }
}

const register = async (req, res) => {
    try {
        await user.create(req.body);
        printSuccess("Successfully Registered");
        res.status(200).send("registered");
    } catch (error) {
        printError(error.message);
        res.status(400).send(error.message);
    }
}


module.exports = {
    login,
    register
}


