import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/userAction";
class Login extends Component {
  loginEvent = () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    this.props.login(username, password);
  };

  signup = () => {
    this.props.history.push("/signup");
  };

  componentDidUpdate() {
    if (this.props.user.authenticated) {
      this.props.history.push("/");
    }
  }
  componentDidMount() {
    if (this.props.user.authenticated) {
      this.props.history.push("/");
    }
  }

  render() {
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
              onClick={this.loginEvent}
            />
            <input
              type="button"
              className="btn btn-outline-primary col"
              value="SignUp"
              onClick={this.signup}
            />
          </Form.Group>
        </div>
      </Form>
    );
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) =>
      dispatch(actionCreators.login(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
