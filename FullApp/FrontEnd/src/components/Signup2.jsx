import axios from "axios";
import { useState } from "react";

const Signup2 = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleRegister = async () => {
    const payload = { name, email, pass };

    try {
      const response = await axios.post(
        "http://localhost:8080/users/register",
        payload
      );
      console.log(response.data);
      alert(response.data.msg);
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      
    }
  };
  return (
    <>
      <h2>Please regiter yourself!</h2>
      <input
        type="text"
        placeholder="Enter name..."
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
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
      <button onClick={handleRegister}>Regiter!</button>
    </>
  );
};

export { Signup2 };
