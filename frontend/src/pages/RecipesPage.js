import React from "react";
import RecipeList from "../components/RecipeList";
import { getUserIdFromToken } from "../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/ContextProvider";

const RecipesPage = () => {
  const { setUser } = useAppContext();
  const userId = getUserIdFromToken();
  const navigate = useNavigate();

  const handleAccountLogout = () => {
    window.localStorage.removeItem("token");

    setUser(null);

    navigate("/");
  };

  return (
    <div>
      <h1>Recipes Page</h1>
      <button onClick={handleAccountLogout} style={{
            padding: "10px",
            background: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}>
        Logout
      </button>
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
        >Add New Recipe</button>
      </Link>
      <RecipeList />
    </div>
  );
};

export default RecipesPage;
