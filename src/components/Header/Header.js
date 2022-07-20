import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Header.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { isAuthenticated } from "../../Utils/AuthUtil";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  const { userAuth, logout } = useContext(AuthContext);
  const authorization = () => {
    if (!userAuth.authenticated && !isAuthenticated()) {
      return (
        <>
          <Nav.Item>
            <NavLink className="nav-link" to="/signup">
              Sign Up
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </Nav.Item>
        </>
      );
    }

    return (
      <Nav.Item className="logout">
        <div className="nav-link" onClick={logout}>
          Logout
        </div>
      </Nav.Item>
    );
  };

  return (
    <Navbar
      collapseOnSelect
      expand="md"
      className="navbar sticky-top top-1 mb-3 rounded-3 bg-dark navbar-dark mt-1"
    >
      <Container className="py-2 px-2">
        <NavLink className="navbar-brand" to="/">
          SMA
        </NavLink>

        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse className="justify-content-end" id="navbar-nav">
          <Nav className="navbar-nav justify-content-end">
            {authorization()}
            <Nav.Item>
              <NavLink className="nav-link" to="/posts">
                Posts
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink className="nav-link" to="/new-post">
                New Post
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink className="nav-link" to="/discover">
                Discover
              </NavLink>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
