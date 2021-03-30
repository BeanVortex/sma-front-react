import React, { Component } from "react";
import "./Discover.scss";
import CardColumns from "react-bootstrap/CardColumns";
import axios from "axios";
import { Link } from "react-router-dom";
import Post from "../Posts/Post/Post";

export default class Discover extends Component {
  state = {
    posts: null,
    fetched: false,
  };

  componentDidMount() {
    this.fetchPosts();
  }
  componentDidUpdate() {
    this.fetchPosts();
  }

  fetchPosts = () => {
    if (!this.state.fetched) {
      axios.get("/api/post/all/").then((response) => {
        this.setState({ posts: response.data, fetched: true });
      });
    }
  };

  render() {
    let posts = "";
    if (this.state.posts != null && this.state.posts != "") {
      posts = this.state.posts.content.map((post) => (
        <Link key={post.id} to={"posts/" + post.id}>
          <Post img={post.image} title={post.title} content={post.content} />
        </Link>
      ));
    }

    return <CardColumns>{posts}</CardColumns>;
  }
}
