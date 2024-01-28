import React from "react";
import RecipeList from "../components/RecipeList";
import { Link } from "react-router-dom";

const RecipesPage = () => {
  return (
    <div>
      <h1>Recipes Page</h1>
      <Link to="/add-recipe">
        <button
          style={{
            padding: "10px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginLeft: "1.8rem"
          }}
        >Dodaj nowy przepis</button>
      </Link>
      <RecipeList />
    </div>
  );
};

export default RecipesPage;
