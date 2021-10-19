const express = require('express');
const router = require('./routes/');
require('dotenv').config();
const app = express()
const port = process.env.PORT;

// MiddleWares
app.use(router);
app.use(express.json());

app.listen(port,process.env.HOST, () => {
  console.log(`App listening at http://${process.env.HOST}:${port}`)
})

