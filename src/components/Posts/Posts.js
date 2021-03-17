import React, { Component } from "react";
import "./Posts.scss";
import Post from "./Post/Post";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CardColumns from "react-bootstrap/CardColumns";
import { connect } from "react-redux";
import { redirect } from "../../Utils/AuthUtil";
class Posts extends Component {
  state = {
    posts: null,
    pageable: true,
  };

  componentDidMount() {
    console.log(this.props.user);
    if (this.props.user.authenticated) {
      axios.get("/api/post/")
      .then((response) => {
        this.setState({ posts: response.data });
      });
    }
  }

  render() {
    let posts = "";
    if (this.state.posts != null) {
      posts = this.state.posts.content.map((post) => (
        <Link key={post.id} to={"posts/" + post.id}>
          <Post img={post.image} title={post.title} content={post.content} />
        </Link>
      ));
    }

    return (
      <CardColumns>
        {redirect(this.props.user.authenticated)}
        {posts}
      </CardColumns>
    );
  }
}

//state we set up at reducer.js
const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Posts);
