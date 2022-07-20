import React, { useContext, useEffect } from "react";
import { Form } from "react-bootstrap";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { userAuth, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const loginEvent = () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    login(username, password);
  };

  const signup = () => navigate("/signup");

  useEffect(() => {
    if (userAuth.authenticated) navigate("/", { replace: true });
  }, [userAuth.authenticated]);

  return (
    <Form className="d-flex justify-content-center h-100">
      <div className="w-75 d-flex flex-column justify-content-center">
        <Form.Group className="mb-4">
          <input
            type="text"
            id="username"
            placeholder="Username/Email"
            className="form-control "
          />
          <div className="invalid-feedback mb-3">
            Enter your username or email
          </div>
        </Form.Group>

        <Form.Group className="mb-4">
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="form-control"
          />
          <div className="invalid-feedback mb-3">Enter your password</div>
        </Form.Group>

        <Form.Group className="d-flex ">
          <input
            type="button"
            className="btn btn-success col mx-1"
            value="Login"
            onClick={loginEvent}
          />
          <input
            type="button"
            className="btn btn-outline-primary col mx-1"
            value="SignUp"
            onClick={signup}
          />
        </Form.Group>
      </div>
    </Form>
  );
};

export default Login;
