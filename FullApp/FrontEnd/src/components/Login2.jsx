import { useState } from "react";
import axios from "axios";

const Login2 = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = async () => {
    const payload = { email, pass };

    try {
      const response = await axios.post(
        "http://localhost:8080/users/login",
        payload
      );
      console.log(response.data)
      alert(response.data.msg);
      localStorage.setItem("accessToken", response.data.token);
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
    }
  };
  return (
    <>
      <h2>Already a user, please login!</h2>
      <input
        type="text"
        placeholder="Enter email..."
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Enter the Password..."
        value={pass}
        onChange={(e) => {
          setPass(e.target.value);
        }}
      />
      <button onClick={handleLogin}>Login!</button>
    </>
  );
};

export { Login2 };
