const createAllTables = require("../database/tableCreation");
const authRouter = require("./auth");

const router = require("express").Router();

router.get('/',(req,res)=>{
    res.send("hello world!!!");
})

router.use("/auth",authRouter);

router.get('/createAllTable', async (req, res) => {
    try{
        await createAllTables();
        res.status(200).send("ok");
    }catch(error){
        res.status(400).send(error);
    }
})

module.exports = router;