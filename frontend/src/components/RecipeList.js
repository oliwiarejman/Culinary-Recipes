
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/recipes/search?title=${searchTitle}`
        );
        setRecipes(response.data);
      } catch (error) {
        console.error("Błąd pobierania przepisów:", error.message);
      }
    };

    fetchRecipes();
  }, [searchTitle]);

  const handleSearchChange = (e) => {
    setSearchTitle(e.target.value);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2 style={{ fontSize: "24px", marginBottom: "16px", textAlign: "center" }}>
        Lista Przepisów
      </h2>
      <div style={{ marginBottom: "16px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Szukaj po tytule"
          value={searchTitle}
          onChange={handleSearchChange}
          style={{
            marginBottom: ".5rem",
            padding: "8px",
            width: "80%",
            marginRight: "8px",
            borderRadius: "5px",
          }}
        />
        <button
          onClick={() => setSearchTitle("")}
          style={{
            padding: "8px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Wyczyść
        </button>
      </div>
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
