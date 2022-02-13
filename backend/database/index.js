const dbDetail = require("./dbDetail.js");
const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://${dbDetail.username}:${dbDetail.password}@${dbDetail.cluster}.1zkio.mongodb.net/${dbDetail.dbname}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Database Connected successfully");
});
