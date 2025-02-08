import axios from "axios";
import { useContext, useEffect, useState, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const authorizationToken = `Bearer ${token}`;

  const API = "http://localhost:3000";

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;

  // Logout functionality
  const LogoutUser = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
  };

  // Axios instance with request interceptor
  const api = axios.create({
    baseURL: API,
  });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Fetch user authentication
  const userAuthentication = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/api/auth/user");
      console.log("Userdata", response.data.data);
      setUser(response.data.data);
    } catch (error) {
      console.error("Error fetching user data", error);
      setUser(null);
      setToken(""); // Clear token on failure
      localStorage.removeItem("token");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch available services
  const getServices = async () => {
    try {
      const response = await axios.get(`${API}/api/data/service`);
      console.log(response.data.msg);
      setServices(response.data.msg);
    } catch (error) {
      console.error(`Services frontend error: ${error}`);
    }
  };

  // Use effect to refetch data when token changes
  useEffect(() => {
    if (token) {
      userAuthentication();
    }
    getServices();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLS,
        LogoutUser,
        user,
        services,
        isLoading,
        API,
        authorizationToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
