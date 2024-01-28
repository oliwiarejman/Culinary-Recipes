

import React from "react";
import axios from "axios";

const DeleteAccountButton = ({ userId, onAccountDeleted }) => {
  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${userId}`);
      onAccountDeleted();
    } catch (error) {
      console.error("Error deleting account:", error.message);
    }
  };

  return (
    <button
    style={{
        padding: "10px",
        background: "#f44336",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }} 
    onClick={handleDeleteAccount}>
      Delete Account
    </button>
  );
};

export default DeleteAccountButton;
