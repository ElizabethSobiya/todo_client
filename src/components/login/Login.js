import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './style.css'

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        username,
        password,
      });
      const { token, userId } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      navigate("/todo");
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred during login");
      }
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="container1">
      <div className="row justify-content-center pt-4 pb-2">
        <div className="col-md-8">
          <h2>Signin to TaskMate</h2>
          <form className="login-form">
            <div className="mb-3">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control no-focus-outline"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">Password</label>
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
              className="btn btn-outline-info w-100"
              onClick={handleLogin}
            >
              Login
            </button>
            <p className="acct">Didn't had an account? <span className="signUp" style={{textDecoration:'none'}}><Link to='/register'>Signup Now</Link></span></p>
            {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
