import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Header.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar } from "react-bootstrap";

export default class Header extends Component {
  render() {
    return (
      <Navbar
        collapseOnSelect
        expand="md"
        className="navbar sticky-top top-1 mb-3 rounded-lg bg-dark navbar-dark mt-1"
      >
        <Container className="py-2 px-0">
          <NavLink className="navbar-brand" to="/">
            SMA
          </NavLink>

          <Navbar.Toggle aria-controls="navbar-nav" />

          <Navbar.Collapse className="justify-content-end" id="navbar-nav">
            <Nav className="navbar-nav justify-content-end">
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
  }
}
