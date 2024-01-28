import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import AddComment from "../components/AddComment";

const RecipeDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        fetch(`http://localhost:3000/api/comments/recipes/${id}`)
          .then((r) => r.json())
          .then((d) => {
            data["comments"] = d;
            setRecipe(data);
          });
      });
  }, [id]);

  const handleCommentAdded = (newComment) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      comments: [...prevRecipe.comments, newComment],
    }));
  };

  const handleDeleteRecipe = async () => {
    try {
      const token = window.localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.delete(
        `http://localhost:3000/api/recipes/${id}`,
        { headers: headers }
      );

      if (response.status === 200) {
        navigate("/recipes");
      }
    } catch (error) {
      console.error("Błąd usuwania przepisu:", error.message);
    }
  };

  return (
    <div
      style={{
        margin: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "24px", marginBottom: "16px" }}>
        {recipe.title}
      </h1>
      <div style={{ marginBottom: "16px" }}>
        <h3>Składniki:</h3>
        <p>{recipe.ingredients}</p>
      </div>
      <div style={{ marginBottom: "16px" }}>
        <h3>Kroki:</h3>
        <p>{recipe.preparation_steps}</p>
      </div>
      <div style={{ marginBottom: "16px" }}>
        <h3>Czas przygotowania:</h3>
        <p>{recipe.preparation_time}</p>
      </div>
      <div style={{ marginBottom: "16px" }}>
        <h3>Poziom trudności:</h3>
        <p>{recipe.difficulty}</p>
      </div>
      <div style={{ marginBottom: "16px" }}>
        <h3>Ocena:</h3>
        <p>{recipe.averageRating}</p>
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "16px",
        }}
      >
        <Link to={`/recipes/${id}/edit`}>
          <button
            style={{
              padding: "10px",
              background: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Edytuj przepis
          </button>
        </Link>
        <button
          onClick={handleDeleteRecipe}
          style={{
            padding: "10px",
            background: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Usuń przepis
        </button>
      </div>
      <AddComment
        recipeId={recipe.id}
        onCommentAdded={handleCommentAdded}
        style={{
          marginTop: "20px",
          width: "100%",
        }}
      />
    </div>
  );
};

export default RecipeDetailsPage;
