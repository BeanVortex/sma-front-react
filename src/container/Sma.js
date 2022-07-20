import React from "react";
import "./Sma.scss";
import Header from "../components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Posts from "../components/Posts/Posts";
import FullPost from "../components/Posts/FullPost/FullPost";
import NewPost from "../components/Posts/NewPost/NewPost";
import Discover from "../components/Discover/Discover";
import "bootstrap/dist/css/bootstrap.min.css";
import Side from "../components/Side/Side";
import { Container, Row, Col } from "react-bootstrap";
import Login from "../components/User/Login/Login";
import Signup from "../components/User/Signup/Signup";

const Sma = () => {
  return (
    <div>
      <Container className="overflow-x-hidden pb-2">
        <Header className="sticky head d-block" />

        <Row className="d-flex justify-content-center">
          <Col className="col-lg-2 d-none d-lg-block mt-2">
            <Side />
          </Col>
          <Col className="col-lg-8 col-md-12 col-sm-12 mt-2 mb-2">
            <Routes>
              <Route exact path="/" element={<Posts/>} />
              <Route exact path="/posts" element={<Posts/>} />
              <Route exact path="/posts/:postId" element={<FullPost/>} />
              <Route exact path="/new-post" element={<NewPost/>} />
              <Route exact path="/discover" element={<Discover/>} />
              <Route exact path="/login" element={<Login/>}></Route>
              <Route path="/signup" element={<Signup/>}></Route>
            </Routes>
          </Col>
          <Col className="col-lg-2 d-none d-lg-block mt-2">
            <Side />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Sma;
