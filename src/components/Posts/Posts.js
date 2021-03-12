import React, { Component } from "react";
import "./Posts.scss";
import Post from "./Post/Post";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CardColumns from "react-bootstrap/CardColumns";
import { connect } from "react-redux";

class Posts extends Component {
  state = {
    posts: null,
    pageable: true,
  };

  componentDidMount() {
    axios.get("/api/post/").then((response) => {
      this.setState({ posts: response.data });
    });
  }

  render() {
    let posts = "";
    console.log(this.props.match.path);
    if (this.state.posts != null) {
      posts = this.state.posts.content.map((post) => (
        <Link key={post.id} to={"posts/" + post.id}>
          <Post img={post.image} title={post.title} content={post.content} />
        </Link>
      ));
    }

    let redirect = null;
    if (!this.props.user.authenticated){
      redirect = <Redirect from="/" to="/login"/>
    }

    return <CardColumns>{redirect}{posts}</CardColumns>;
  }
}

//state we set up at reducer.js
const mapStateToProps = (state) => state;


export default connect(mapStateToProps)(Posts);