const express = require('express');
const router = require('./routes/');
require('dotenv').config();
const app = express()
const port = process.env.PORT;
const cors = require('cors');

// MiddleWares
app.use(router);
app.use(express.json());
app.use(cors());

app.listen(port,process.env.HOST, () => {
  console.log(`App listening at http://${process.env.HOST}:${port}`)
})

