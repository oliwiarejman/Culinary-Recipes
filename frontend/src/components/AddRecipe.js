import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      ingredients: "",
      preparation_steps: "",
      preparation_time: "",
      difficulty: "",
    },
    onSubmit: async (values) => {
      try {
        const token = window.localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.post(
          "http://localhost:3000/api/recipes",
          values,
          { headers: headers }
        );

        if (response.status === 201) {
          navigate("/recipes");
        }
      } catch (error) {
        console.error("Błąd dodawania przepisu:", error.message);
      }
    },
  });

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Dodaj nowy przepis</h2>
      <form onSubmit={formik.handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <h3>Tytuł:</h3>
          <label>
            <input
              type="text"
              name="title"
              onChange={formik.handleChange}
              value={formik.values.title}
              style={{ width: "100%", padding: "8px", marginLeft: "-10px" }}
            />
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <h3>Składniki:</h3>
          <label>
            <textarea
              name="ingredients"
              onChange={formik.handleChange}
              value={formik.values.ingredients}
              style={{ width: "100%", padding: "8px", marginLeft: "-10px" }}
            />
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <h3>Kroki przygotowania:</h3>
          <label>
            <textarea
              name="preparation_steps"
              onChange={formik.handleChange}
              value={formik.values.preparation_steps}
              style={{ width: "100%", padding: "8px", marginLeft: "-10px" }}
            />
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <h3>Czas przygotowania:</h3>
          <label>
            <input
              type="text"
              name="preparation_time"
              onChange={formik.handleChange}
              value={formik.values.preparation_time}
              style={{ width: "100%", padding: "8px", marginLeft: "-10px" }}
            />
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <h3>Poziom trudności:</h3>
          <label>
            <select
              style={{ width: "100%", padding: "8px" }}
              name="difficulty"
              value={formik.values.difficulty}
              onChange={formik.handleChange}
            >
              <option value="">Wybierz poziom trudności</option>
              <option value="łatwy">Łatwy</option>
              <option value="średni">Średni</option>
              <option value="trudny">Trudny</option>
            </select>
          </label>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Dodaj przepis
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
