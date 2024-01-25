import React from "react";
import LoginForm from "../components/LoginForm";

const HomePage = ({ history }) => {
  const handleLogin = (c) => {
    window.localStorage.setItem("token", c.token);
    console.log("Użytkownik zalogowany!", c);
  };

  return (
    <div>
      <h1>Witaj na stronie głównej</h1>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default HomePage;
