import React, { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import { useParams } from "react-router-dom";
import axios from "axios";

const RecepieDetailsPage = () => {
  let { id } = useParams();
  const [recipe, setPhotos] = useState([]);
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
            setPhotos(data);
          });
      });
  }, []);
  return (
    <div>
      {JSON.stringify(recipe)}
      <h1>Tytuł: {recipe.title}</h1>
      <h3>Składniki: {recipe.ingredients}</h3>
      <h3>Kroki: {recipe.preparation_steps}</h3>
      <h3>Czas przygotowania: {recipe.preparation_time}</h3>
      <h3>Poziom trudności: {recipe.difficulty}</h3>
      <h3>Ocena: {recipe.averageRating}</h3>

      <h2>Komentarze:</h2>
      <hr />
      {recipe.comments &&
        recipe.comments.map((comment) => (
          <div> Komentarz: {JSON.stringify(comment)} </div>
        ))}

      {recipe.comments && recipe.comments.length === 0 && (
        <div>Brak komentarzy</div>
      )}
    </div>
  );
};

export default RecepieDetailsPage;
