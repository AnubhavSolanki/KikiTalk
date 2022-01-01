const authRouter = require("./auth");
const router = require("express").Router();
const cors = require('cors');

router.get('/', (req, res) => {
    res.send("hello world!!!");
})

router.use(cors());
router.use("/auth", authRouter);

module.exports = router;
