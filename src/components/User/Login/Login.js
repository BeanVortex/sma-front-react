import React, { useContext, useEffect } from "react";
import { Form } from "react-bootstrap";
import { AuthContext } from "../../../context/AuthContext";

const Login = (props) => {
  const { userAuth, login } = useContext(AuthContext);

  const loginEvent = () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    login(username, password);
  };

  const signup = () => {
    props.history.push("/signup");
  };

  useEffect(() => {
    if (userAuth.authenticated) props.history.push("/");
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
            className="btn btn-success mr-2 col"
            value="Login"
            onClick={loginEvent}
          />
          <input
            type="button"
            className="btn btn-outline-primary col"
            value="SignUp"
            onClick={signup}
          />
        </Form.Group>
      </div>
    </Form>
  );
};

export default Login;
