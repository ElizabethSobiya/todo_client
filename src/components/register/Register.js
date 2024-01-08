import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const RegisterComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:8000/auth/register", {
        username,
        password,
      });
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Error registering user");
      }
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <form className="register-form">
            <h2>Register</h2>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleRegister}
            >
              Register
            </button>
            <Link to="/login">
              
              <button
                type="button"
                className="btn btn-primary"
                style={{marginLeft:'20px'}}
              >
                Login
              </button>
            </Link>
            {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
