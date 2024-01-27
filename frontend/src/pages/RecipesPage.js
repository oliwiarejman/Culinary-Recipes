import React from "react";
import RecipeList from "../components/RecipeList";
import { Link } from "react-router-dom";

const RecipesPage = () => {
  return (
    <div>
      <h1>Recipes Page</h1>
      <Link to="/add-recipe">
        <button>Dodaj nowy przepis</button>
      </Link>
      <RecipeList />
    </div>
  );
};

export default RecipesPage;
