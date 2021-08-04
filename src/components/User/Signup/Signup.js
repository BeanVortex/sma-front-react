import React, { useContext, useEffect } from "react";
import { Form } from "react-bootstrap";
import { AuthContext } from "../../../context/AuthContext";

const Signup = (props) => {
  const { userAuth, signup } = useContext(AuthContext);

  const signupEvent = () => {
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    signup(email, username, password);
  };

  const login = () => {
    props.history.push("/login");
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
            id="email"
            placeholder="Email"
            className="form-control "
          />
          <div className="invalid-feedback mb-3">Enter your email</div>
        </Form.Group>

        <Form.Group className="mb-4">
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="form-control "
          />
          <div className="invalid-feedback mb-3">Enter your username</div>
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
            className="btn btn-outline-success mr-2 col"
            value="Login"
            onClick={login}
          />
          <input
            type="button"
            className="btn btn-primary col"
            value="SignUp"
            onClick={signupEvent}
          />
        </Form.Group>
      </div>
    </Form>
  );
};

export default Signup;
