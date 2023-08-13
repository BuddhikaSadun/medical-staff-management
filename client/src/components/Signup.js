import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import "../assests/Signup.css";
import Header from "./StaffHeader";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [position, setPosition] = useState("");
  const [error, setError] = useState("");

  const signupHandler = async (data) => {
    data.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/basicUser/createUser",
        {
          email: email,
          password: password,
          position: position,
        }
      );

      setEmail("");
      setPassword("");
      setPosition("");
      console.log(response);
      Swal.fire({
        title: "Success",
        type: "success",
        text: "Sucessfully saved!",
      });
      //alert("User added!!");
    } catch (error) {
      console.error(error);
      //console.log(error.response.data);
      //setError("Email Already used");

      Swal.fire({
        icon: "error",
        title: "Error",
        type: "error",
        text: "Error in saving!",
        position: "center",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  return (
    <div className="background">
      <Header />
      <h1 className="signup-title">Signup</h1>

      <div className="signup-container">
        <form onSubmit={signupHandler}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          <select
            className="form-select form-select-lg mb-3"
            aria-label="Large select example"
            value={position}
            onChange={(event) => {
              setPosition(event.target.value);
            }}
          >
            <option value="">Select your Role</option>
            <option value="Staff">Staff</option>
            <option value="Admin">Admin</option>
          </select>

          <button
            type="submit"
            className="btn btn-primary"
            style={{
              cursor: "pointer",
              margin: "0% 0% 0% 50%",
              // Adding cursor: "pointer" for the hover effect
              // Additional styles for the hover effect can be added here
              // For example: backgroundColor: "#0056b3"
            }}
          >
            Signup
          </button>
        </form>
        <p>
          Already Signed up?<Link to="/">Log in </Link>
        </p>
      </div>
    </div>
  );
}
export default Signup;
