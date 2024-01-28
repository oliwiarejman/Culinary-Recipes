
import React from "react";
import { useFormik } from "formik";
import axios from "axios";

const EditRecipeForm = ({ recipeId, onCancelEdit }) => {
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
        const response = await axios.put(
          `http://localhost:3000/api/recipes/${recipeId}`,
          values,
          { headers: headers }
        );

        if (response.status === 200) {
          onCancelEdit();
        }
      } catch (error) {
        console.error("Błąd edycji przepisu:", error.message);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <button type="submit">Zapisz edycję</button>
      <button type="button" onClick={onCancelEdit}>
        Anuluj
      </button>
    </form>
  );
};

export default EditRecipeForm;
