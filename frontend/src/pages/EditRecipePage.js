
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditRecipePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: "",
    preparation_steps: "",
    preparation_time: "",
    difficulty: "",
  });

  useEffect(() => {

    axios.get(`http://localhost:3000/api/recipes/${id}`)
      .then((response) => {
        setRecipe(response.data);
      })
      .catch((error) => {
        console.error("Błąd pobierania danych przepisu:", error.message);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {

      const token = window.localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      await axios.put(`http://localhost:3000/api/recipes/${id}`, recipe, { headers });

      navigate(`/recipes/${id}`);
    } catch (error) {
      console.error("Błąd zapisywania zmian w przepisie:", error.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Edytuj przepis</h2>
      <form>
        <div style={{ marginBottom: "10px" }}>
          <h3>Tytuł:</h3>
          <input
            defaultValue={recipe.title}
            type="text"
            name="title"
            value={recipe.title}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "8px",marginLeft: "-10px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <h3>Składniki:</h3>
          <textarea
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "8px" ,marginLeft: "-10px"}}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <h3>Kroki przygotowania:</h3>
          <textarea
            name="preparation_steps"
            value={recipe.preparation_steps}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "8px",marginLeft: "-10px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <h3>Czas przygotowania:</h3>
          <input
            type="text"
            name="preparation_time"
            value={recipe.preparation_time}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "8px",marginLeft: "-10px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <h3>Poziom trudności:</h3>
          <select
            name="difficulty"
            value={recipe.difficulty}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "8px"}}
          >
            <option value="">Wybierz poziom trudności</option>
            <option value="łatwy">Łatwy</option>
            <option value="średni">Średni</option>
            <option value="trudny">Trudny</option>
          </select>
        </div>

        <button
          type="button"
          onClick={handleSaveChanges}
          style={{
            width: "100%",
            padding: "10px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginBottom: "2rem"
          }}
        >
          Zapisz zmiany
        </button>
      </form>
    </div>
  );
};

export default EditRecipePage;
