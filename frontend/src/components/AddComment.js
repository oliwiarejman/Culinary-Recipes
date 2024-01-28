import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const RecepieDetailsPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/recipes/${id}`
        );
        const recipeData = response.data;

        const commentsResponse = await axios.get(
          `http://localhost:3000/api/comments/recipes/${id}`
        );
        const commentsData = commentsResponse.data;

        setRecipe({ ...recipeData, comments: commentsData });
      } catch (error) {
        console.error("Błąd pobierania przepisu:", error.message);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();

    try {
      const token = window.localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.post(
        "http://localhost:3000/api/comments",
        {
          recipe_id: id,
          comment_text: newComment,
          rating: newRating,
        },
        { headers: headers }
      );

      if (response.status === 201) {
        setRecipe({ ...recipe, comments: [...recipe.comments, response.data] });
        setNewComment("");
        setNewRating(0);
      }
    } catch (error) {
      console.error("Błąd dodawania komentarza:", error.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const token = window.localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.delete(
        `http://localhost:3000/api/comments/${commentId}`,
        { headers: headers }
      );

      if (response.status === 200) {
        const updatedComments = recipe.comments.filter(
          (comment) => comment._id !== commentId
        );
        setRecipe({ ...recipe, comments: updatedComments });
      }
    } catch (error) {
      console.error("Błąd usuwania komentarza:", error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleAddComment}>
        <label>
          Dodaj komentarz:
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </label>
        <label>
          Oceń przepis:
          <select
            value={newRating}
            onChange={(e) => setNewRating(parseInt(e.target.value, 10))}
          >
            {[0, 1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>
                {rating}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Dodaj</button>
      </form>

      <h2>Komentarze:</h2>
      <hr />
      {recipe.comments &&
        recipe.comments.map((comment) => (
          <div
            key={comment._id}
            style={{
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#386fa4",
              color: "white"
            }}
          >
            <p>
              Komentarz: {comment.comment_text} | Ocena: {comment.rating}
            </p>
            <button onClick={() => handleDeleteComment(comment._id)}>
              Usuń
            </button>
          </div>
        ))}
      {recipe.comments && recipe.comments.length === 0 && (
        <div>Brak komentarzy</div>
      )}
    </div>
  );
};

export default RecepieDetailsPage;
