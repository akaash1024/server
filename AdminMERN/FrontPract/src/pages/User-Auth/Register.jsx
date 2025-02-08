import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../AuthContextStore";
import { toast } from "react-toastify";
import axios from "axios"; // ✅ Import axios

export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLS, API } = useAuth();

  const URL = `${API}/api/auth/register`;

  // handling input values
  const handleInput = (e) => {
    let { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(URL, user, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Response from server:", data); // ✅ Log full response

      if (data.newUserDetails?.token) {
        storeTokenInLS(data.newUserDetails.token);
        setUser({ username: "", email: "", phone: "", password: "" });
        toast.success("Registration successful");
        navigate("/");
      } else {
        toast.error(data.msg || "Something went wrong");
      }
    } catch (error) {
      console.log("Register error:", error);
      toast.error(error.response?.data?.msg || "Failed to register. Please try again.");
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img src="/images/register.png" alt="a girl is trying to do registration" width="500" height="500" />
              </div>

              <div className="registration-form">
                <h1 className="main-heading mb-3">Registration Form</h1>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" placeholder="Username" id="username" required autoComplete="off" value={user.username} onChange={handleInput} />
                  </div>

                  <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="Enter your email" id="email" required autoComplete="off" value={user.email} onChange={handleInput} />
                  </div>

                  <div>
                    <label htmlFor="phone">Phone</label>
                    <input type="number" name="phone" placeholder="Phone" id="phone" required autoComplete="off" value={user.phone} onChange={handleInput} />
                  </div>

                  <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Password" id="password" required autoComplete="off" value={user.password} onChange={handleInput} />
                  </div>

                  <br />
                  <button type="submit" className="btn btn-submit">Register Now</button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
