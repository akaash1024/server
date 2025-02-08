import axios from "axios";

const axiosFE = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});



export const register = (payload) =>{
    return axiosFE.post("api/user/register", payload)
}



// const handleRegister = async () => {
//     const payload = { name, email, pass };

//     try {
//       const response = await axios.post(
//         "http://localhost:8080/users/register",
//         payload
//       );
//       console.log(response.data);
//       alert(response.data.msg);
//     } catch (error) {
//       console.error("Signup Error:", error.response?.data || error.message);
      
//     }
//   };