import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import "../assests/Login.css";
import Header from "./StaffHeader";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [position, setPosition] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();
  const loginHandler = async (data) => {
    data.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/basicUser/loginUser",
        {
          email: email,
          password: password,
          position: position,
        }
      );

      setEmail("");
      setPassword("");
      //setAuth(response.data.user);
      const uid = response.data;
      console.log(response.data.data.user[0].id); // Log the user data

      Swal.fire({
        title: "Success",
        type: "success",
        text: `Sucessfully logged in!`,
      });

      setTimeout(() => {
        navigate("/staff/" + uid);
      }, 1000);
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        type: "error",
        text: "Error in logging!",
        position: "center",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  return (
    <div className="background">
      <Header />
      <h1 className="signup-title">Login</h1>

      <div className="signup-container">
        <form onSubmit={loginHandler}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{
              margin: "0% 0% 0% 50%",
              ":hover": {
                cursor: "pointer",
                // New background color on hover
              },
            }}
          >
            Submit
          </button>
        </form>
        <p>
          Not yet sign up ?<Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
export default Login;
