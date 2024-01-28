import * as jwtDecode from 'jwt-decode';

const getUserIdFromToken = () => {

  const token = window.localStorage.getItem("token");

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      return userId;
    } catch (error) {
      console.error("Błąd dekodowania tokenu:", error.message);
    }
  }

  return null;
};

export { getUserIdFromToken };
