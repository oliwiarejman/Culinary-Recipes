
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import AddComment from "../components/AddComment";


const RecepieDetailsPage = () => {
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
    <div style={{ margin: "2rem" }}>
      <h1>Tytuł: {recipe.title}</h1>
      <h3>Składniki: {recipe.ingredients}</h3>
      <h3>Kroki: {recipe.preparation_steps}</h3>
      <h3>Czas przygotowania: {recipe.preparation_time}</h3>
      <h3>Poziom trudności: {recipe.difficulty}</h3>
      <h3>Ocena: {recipe.averageRating}</h3>
      <Link to={`/recipes/${id}/edit`}>
        <button>Edytuj przepis</button>
      </Link>
      <button onClick={handleDeleteRecipe} style={{ marginTop: "20px" }}>
        Usuń przepis
      </button>
      <AddComment recipeId={recipe.id} onCommentAdded={handleCommentAdded} />

    </div>
  );
};

export default RecepieDetailsPage;
