import React, { Component } from "react";
import "./NewPost.scss";
import axios from "axios";
import no_img from "./no-photo.png";
import { debounce } from "lodash";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Card, Alert } from "react-bootstrap";
import { redirect, requestHeader } from "../../Utils/AuthUtil";
import { connect } from "react-redux";
class NewPost extends Component {
  state = {
    title: null,
    content: null,
    file: null,
    upload_status: null,
    curImg: no_img,
  };

  fileHandleChange = (event) => {
    if (event.target.files[0]) {
      const postfix = event.target.files[0].name.split(".")[1];
      if (postfix === "jpeg" || postfix === "jpg" || postfix === "png") {
        this.setState({
          file: event.target.files[0],
          curImg: URL.createObjectURL(event.target.files[0]),
        });
        const label = document.getElementById("file-label");
        label.innerHTML = event.target.files[0].name;
      } else {
        alert(
          postfix +
            " files are not supported\nSupported formats: jpeg, jpg, png"
        );
      }
    }
  };

  titleHandleChange = debounce((event) => {
    this.setState({ title: event.target.value });
    const titleIn = document.getElementById("title-in");
    titleIn.classList.remove("is-invalid");
  }, 250);

  contentHandleChange = debounce((event) => {
    this.setState({ content: event.target.value });
    const contentIn = document.getElementById("content-in");
    contentIn.classList.remove("is-invalid");
  }, 250);

  upload = () => {
    const file = this.state.file;
    const title = this.state.title;
    const content = this.state.content;
    console.log(requestHeader());
    if (this.validation(file, title, content)) {
      const data = new FormData();
      data.append("file", file);
      data.append("title", title);
      data.append("content", content);
      data.append("user.id", this.props.user.userId);
      axios({
        url: "/api/post/",
        data: data,
        method: "POST",
      })
        .then((response) => {
          this.statusAlerts(response);
          this.resetComponent();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  validation = (file, title, content) => {
    const titleIn = document.getElementById("title-in");
    const contentIn = document.getElementById("content-in");

    if (!file) {
      alert("Post without images??");
    } else {
      const postfix = file.name.split(".")[1];
      if (!(postfix === "jpeg" || postfix === "jpg" || postfix === "png")) {
        alert(postfix + " files are not supported");
      }
    }
    if (!title) {
      titleIn.classList.add("is-invalid");
    }
    if (!content) {
      contentIn.classList.add("is-invalid");
    }
    if (!file || !title || !content) {
      return false;
    }
    return true;
  };

  statusAlerts = (response) => {
    switch (response.status) {
      case 200:
        this.setState({
          upload_status: (
            <Alert className="alert-success">Successfully posted</Alert>
          ),
        });
        break;
      case 500:
        this.setState({
          upload_status: (
            <Alert className="alert-danger">
              Server Error. Try again later. ErrorCode: {response.status}
            </Alert>
          ),
        });
        break;
      case 400:
        this.setState({
          upload_status: (
            <Alert className="alert-danger">
              Something went wrong. Try again later ErrorCode: {response.status}
            </Alert>
          ),
        });
        break;
      case 401:
        this.setState({
          upload_status: (
            <Alert className="alert-danger">
              You are logged out. Try logging in again. ErrorCode:{" "}
              {response.status}
            </Alert>
          ),
        });
        break;
      case 404:
        this.setState({
          upload_status: (
            <Alert className="alert-danger">
              Not found. ErrorCode: {response.status}
            </Alert>
          ),
        });
        break;
      case 403:
        this.setState({
          upload_status: (
            <Alert className="alert-danger">
              You are not allowed to post. ErrorCode: {response.status}
            </Alert>
          ),
        });
        break;

      default:
    }
  };

  resetComponent = () => {
    const fileLabel = document.getElementById("file-label");
    const titleIn = document.getElementById("title-in");
    const contentIn = document.getElementById("content-in");

    new Promise((resolve) => {
      setTimeout(resolve, 100);
    }).then(() => {
      titleIn.value = "";
      contentIn.value = "";
      fileLabel.innerHTML = "Add Image";
      this.setState({
        title: null,
        content: null,
        file: null,
        upload_status: null,
        curImg: no_img,
      });

      //history.push pushes to the stack
      // history.replace same as Redirect
      // <Redirect to="/posts"/>
      this.props.history.replace({ pathname: "/posts" });
    });
  };

  render() {
    console.log(this.props);
    return (
      <Form>
        {redirect(this.props.user.authenticated)}
        <Card className="card d-block shadow-sm">
          <Card.Body className="pb-0">
            <Card.Img
              className="rounded mb-3 img-fluid d-block w-100 mx-auto img-max"
              src={this.state.curImg}
              alt="File"
            />

            <Form.Group>
              <div className="custom-file">
                <input
                  type="file"
                  name="file"
                  id="file-in"
                  className="custom-file-input form-control"
                  onChange={(event) => this.fileHandleChange(event)}
                />

                <label id="file-label" className="custom-file-label">
                  Add Image
                </label>
              </div>
            </Form.Group>

            <Form.Group>
              <input
                type="text"
                id="title-in"
                placeholder="Title"
                className="form-control mb-2"
                onChange={(event) => this.titleHandleChange(event)}
              />
              <div className="invalid-feedback mb-3">Enter some Content</div>
            </Form.Group>

            <Form.Group>
              <textarea
                rows="5"
                id="content-in"
                placeholder="Content"
                className="form-control mb-2"
                onChange={(event) => this.contentHandleChange(event)}
              />
              <div className="invalid-feedback mb-3">Enter some Content</div>
            </Form.Group>

            <Form.Group className="d-flex justify-content-center">
              <input
                type="button"
                className="btn btn-outline-success d-block w-100"
                value="Post it"
                onClick={this.upload}
              />
            </Form.Group>
            {this.state.upload_status}
          </Card.Body>
        </Card>
      </Form>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(NewPost);
