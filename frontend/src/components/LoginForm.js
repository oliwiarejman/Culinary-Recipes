import React, { useState } from "react";
import axios from "axios";

const LoginForm = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        credentials
      );

      if (response.status === 200) {
        const user = response.data.user;
        const token = response.data.token;

        onLogin({ user, token });
      } else {
        console.log("Błąd logowania");
      }
    } catch (error) {
      console.error("Błąd logowania:", error.message);
      setError("Invalid email or password");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Hasło:
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Zaloguj</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
};

export default LoginForm;
