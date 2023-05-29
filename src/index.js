const serverless = require("serverless-http");
const express = require("express");
const {
  createMessage,
  getMessages,
} = require("./controllers/messageController");
const messageRoutes = require("./routes/messageRoutes");

const app = express();
app.use(express.json());

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.use("/messages", messageRoutes);

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
module.exports.app = app;
module.exports.saveMessages = createMessage;
module.exports.getMessages = getMessages;
