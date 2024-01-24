const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/Culinary-Recipes", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const animeDB = mongoose.connection;
animeDB.on(
  "error",
  console.error.bind(console, "Błąd połączenia z Culinary-Recipes:")
);
animeDB.once("open", function () {
  console.log("Połączono z Culinary-Recipes");
});

app.use("/api/recipes", animeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comments", reviewRoutes);

app.listen(port, () => {
  console.log(`Serwer nasłuchuje na porcie ${port}`);
});
