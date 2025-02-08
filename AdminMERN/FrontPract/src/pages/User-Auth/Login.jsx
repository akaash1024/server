import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../AuthContextStore";
import axios from "axios"; // ✅ Import Axios

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLS, API } = useAuth();
  const URL = `${API}/api/auth/login`;

  // Handling input changes
  const handleInput = (e) => {
    let { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // Handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(URL, user, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Response from server:", data); // ✅ Log response for debugging

      if (data.success && data.data.token) {
        storeTokenInLS(data.data.token);
        setUser({ email: "", password: "" });
        toast.success("Login successful");
        navigate("/");
      } else {
        toast.error(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <section>
      <main>
        <div className="section-registration">
          <div className="container grid grid-two-cols">
            <div className="registration-image">
              <img src="/images/login.png" alt="Let's fill the login form" width="500" height="500" />
            </div>

            <div className="registration-form">
              <h1 className="main-heading mb-3">Login Form</h1>

              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    id="email"
                    required
                    autoComplete="off"
                    value={user.email}
                    onChange={handleInput}
                  />
                </div>

                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    id="password"
                    required
                    autoComplete="off"
                    value={user.password}
                    onChange={handleInput}
                  />
                </div>

                <br />
                <button type="submit" className="btn btn-submit">Login</button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};
