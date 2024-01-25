const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const recipeRoutes = require("./routes/recipeRoutes");
const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/Culinary-Recipes", {
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

app.listen(port, () => {
  console.log(`Serwer nasłuchuje na porcie ${port}`);
});
