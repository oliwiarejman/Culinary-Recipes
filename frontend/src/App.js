import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RecipesPage from "./pages/RecipesPage";
import RecepieDetailsPage from "./pages/RecepieDetailsPage";
import RegisterPage from "./pages/RegisterPage";
import AddRecipe from "./components/AddRecipe";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/recipes/:id" element={<RecepieDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
