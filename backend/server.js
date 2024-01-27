const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");




const mqtt = require("mqtt");
const http = require("http");
const socketIo = require("socket.io");




const recipeRoutes = require("./routes/recipeRoutes");
const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentRoutes");


const mqttClient = mqtt.connect("mqtt://localhost");
const app = express();
const server = http.createServer(app);
const io = socketIo(server,{
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"]
  }
});
let socketClients = {}
mqttClient.subscribe("chat");
mqttClient.on("message", (topic, message) => {
  if (topic === "chat") {
    const chatMessage = message.toString();
    io.emit("chat message", chatMessage);
  }
});
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
  socket.on("chat message", (message) => {
    let jsonMessage = JSON.parse(message);
    jsonMessage['creator_socket_id'] = socket.id
    console.log(jsonMessage)
    mqttClient.publish("chat", JSON.stringify(jsonMessage));
  });
  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});


const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://root:example@localhost:27017/Culinary-Recipes?authSource=admin", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const recipeDB = mongoose.connection;
recipeDB.on(
  "error",
  console.error.bind(console, "Błąd połączenia z Culinary-Recipes:")
);
recipeDB.once("open", function () {
  console.log("Połączono z Culinary-Recipes");
});

app.use("/api/recipes", recipeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);

server.listen(port, () => {
  console.log(`Serwer nasłuchuje na porcie ${port}`);
});
