import React, { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddComment from "../components/AddComment";

const RecepieDetailsPage = () => {
  let { id } = useParams();
  const [recipe, setRecipe] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/api/recipes/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        fetch(`http://localhost:3000/api/comments/recipes/${id}`)
          .then((r) => r.json())
          .then((d) => {
            data["comments"] = d;
            setRecipe(data);
          });
      });
  }, []);

  const handleCommentAdded = (newComment) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      comments: [...prevRecipe.comments, newComment],
    }));
  };

  return (
    <div>
      {JSON.stringify(recipe)}
      <h1>Tytuł: {recipe.title}</h1>
      <h3>Składniki: {recipe.ingredients}</h3>
      <h3>Kroki: {recipe.preparation_steps}</h3>
      <h3>Czas przygotowania: {recipe.preparation_time}</h3>
      <h3>Poziom trudności: {recipe.difficulty}</h3>
      <h3>Ocena: {recipe.averageRating}</h3>

      <AddComment recipeId={recipe.id} onCommentAdded={handleCommentAdded} />
    </div>
  );
};

export default RecepieDetailsPage;
