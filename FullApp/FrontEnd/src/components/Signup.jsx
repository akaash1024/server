import { useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleRegister = () => {
    const payload = {name,email,pass,};

    fetch("http://localhost:8080/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg);
      })
      .catch((error) => console.log(error));
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

export { Signup };
