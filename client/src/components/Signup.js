import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import "../assests/Signup.css";
import Header from "./Header";

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
      Swal.close({
        title: `${error}`,
        text: "Sorry can not save",
      });
    }
  };

  return (
    <div className="background">
      <Header />
      <h1 className="signup-title">Signup</h1>

      <div className="signup-container">
        <form onSubmit={signupHandler}>
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
          <select
            class="form-select form-select-lg mb-3"
            aria-label="Large select example"
            value={position}
            onChange={(event) => {
              setPosition(event.target.value);
            }}
          >
            <label>Login role</label>
            <option>Select your Role</option>
            <option value="Staff">Staff</option>
            <option value="Admin">Admin</option>
          </select>

          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
export default Signup;
