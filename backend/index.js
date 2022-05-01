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

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.use(verifySocketRequest);

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
  socket.on("Send Message", async (messageDetail) => {
    const senderId = socket.user.id;
    messageDetail = { ...messageDetail, senderId };
    const response = await addMessageInDatabase(messageDetail);
    addMessageChannelInDatabase(messageDetail.recieverId, senderId);
    socket.broadcast.emit(messageDetail.recieverId, response);
  });
});

server.listen(port, process.env.HOST, () => {
  console.log(`App listening at http://${process.env.HOST}:${port}`);
});
