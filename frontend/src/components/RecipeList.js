import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/recipes");
        setRecipes(response.data);
      } catch (error) {
        console.error("Błąd pobierania przepisów:", error.message);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2 style={{ fontSize: "24px", marginBottom: "16px", textAlign: "center" }}>
        Lista Przepisów
      </h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {recipes.map((recipe) => (
          <li
            key={recipe._id}
            style={{
              borderBottom: "1px solid #ccc",
              padding: "12px 0",
            }}
          >
            <Link
              to={recipe._id}
              style={{
                textDecoration: "none",
                color: "white",
                backgroundColor: "#386fa4",
                padding: ".2rem",
                textAlign: "center",
                fontSize: "18px",
                display: "block",
                borderRadius: "5px",
                padding: "8px 0",
              }}
            >
              {recipe.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
