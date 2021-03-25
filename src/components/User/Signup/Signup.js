import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/userAction";
class Signup extends Component {
  signupEvent = () => {
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log(this.props);
    this.props.signup(email, username, password);
  };

  login = () => {
    this.props.history.push("/login");
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
              onClick={this.login}
            />
            <input
              type="button"
              className="btn btn-primary col"
              value="SignUp"
              onClick={this.signupEvent}
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
    signup: (email, username, password) =>
      dispatch(actionCreators.signup(email, username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
