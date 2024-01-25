import React from "react";
import LoginForm from "../components/LoginForm";

const HomePage = ({ history }) => {
  const handleLogin = () => {
    console.log("Użytkownik zalogowany!");
  };

  return (
    <div>
      <h1>Witaj na stronie głównej</h1>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default HomePage;
