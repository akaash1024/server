import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext(); // Changed from const to export const

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token")); // Removed the callback function
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const authorizationToken = `Bearer ${token}`; // Added this line

  const API = "http://localhost:3000"; // Added API constant

  const api = axios.create({
    baseURL: API,
    headers: { "Content-Type": "application/json" },
  });

  let isLoggedIn = !!token;

  const storeTokenInLs = (serverToken) => { // Changed from storeTokenInLs to storeTokenInLS
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  const userAuthentication = async () => {
    try {
      setIsLoading(true);
      
      const { data } = await api.get("/api/auth/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Userdata", data.data);
      setUser(data.data);
      
    } catch (error) {
      console.error("Error fetching user data", error);
      setUser(null);
      setToken("");
      localStorage.removeItem("token");
    } finally {
      setIsLoading(false); // Added finally block to always set isLoading to false
    }
  };

  // Logout functionality
  const LogoutUser = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
  };

  // Fetch available books
  const getBooks = async () => {
    try {
      const { data } = await api.get("/api/books");
      setBooks(data.books);
    } catch (error) {
      console.error(`Books frontend error: ${error}`);
    }
  };

  // Authentication effect
  useEffect(() => {
    if (token) {
      userAuthentication();
    }
    getBooks();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        api,
        storeTokenInLs, // Changed from storeTokenInLs to storeTokenInLS
        isLoggedIn,
        LogoutUser,
        user,
        books,
        isLoading,
        API, // Added API
        authorizationToken, // Added authorizationToken
        token, // Added token
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);