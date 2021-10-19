const { addUser } = require("../database/tables/user");
const authRouter = require("express").Router();
const bodyParser = require('body-parser')
authRouter.use(bodyParser.urlencoded({ extended: false }))

authRouter.post('/register', async (req,res) => {
    try{
        await addUser(req.body);
        res.status(200).send("registered");
    }catch(error){
        res.status(400).send(error);
    }
});

authRouter.post('/login', (req,res) => {
    try{
        res.status(200).send("logged in");
    }catch(error){
        res.status(404).send(error);
    }
})

module.exports = authRouter;