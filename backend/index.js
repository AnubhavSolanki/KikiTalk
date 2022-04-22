const express = require("express");
const router = require("./routes/");
require("dotenv").config();
const { Server } = require("socket.io");
const http = require("http");
const app = express();
const port = process.env.PORT;
const cors = require("cors");
const { verifySocketRequest } = require("./middleware/auth");
const { addMessageInDatabase } = require("./controllers/messageController");
const {
  addMessageChannelInDatabase,
} = require("./controllers/messageChannelController");
require("./database");

// MiddleWares
app.use(router);
app.use(express.json());
app.use(cors());

let server = http.createServer(app);

//Socket server

// // plain object
// const socket = io({
//   auth: {
//     token: "abc"
//   }
// });

// // or with a function
// const socket = io({
//   auth: (cb) => {
//     cb({
//       token: "abc"
//     });
//   }
// });

// let io = socketIO(server, {
//   cors: {
//     origin: "*",
//   },
// });

// io.on("connection", async (socket) => {
//   console.log("New user connected");
//   socket.on("Send Message", (messageDetail) => {
//     console.log("here", messageDetail);
//     const senderId = socket.user.id;
//     messageDetail = { ...messageDetail, senderId };
//     addMessageInDatabase(messageDetail);
//     io.emit(`${messageDetail.recieverId}`, messageDetail);
//   });
// });

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3006",
    methods: ["GET", "POST"],
  },
});

io.use(verifySocketRequest);

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
  socket.on("Send Message", async (messageDetail) => {
    console.log("here", messageDetail);
    const senderId = socket.user.id;
    messageDetail = { ...messageDetail, senderId };
    const response = await addMessageInDatabase(messageDetail);
    addMessageChannelInDatabase(messageDetail.recieverId, senderId);
    console.log("channel : ", messageDetail.recieverId);
    socket.emit("61fe6634df0c7feee8a3ba0a", response);
  });
});

server.listen(port, process.env.HOST, () => {
  console.log(`App listening at http://${process.env.HOST}:${port}`);
});
