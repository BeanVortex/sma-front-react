import React, { useState, useContext } from "react";
import "./NewPost.scss";
import axios from "axios";
import no_img from "./no-photo.png";
import { debounce } from "lodash";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Card, Alert } from "react-bootstrap";
import { redirect } from "../../../Utils/AuthUtil";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const validation = (file, title, content) => {
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
  return !(!file || !title || !content);
};

const statusAlerts = (response, setUploadStatus) => {
  switch (response.status) {
    case 200:
      setUploadStatus(
        <Alert className="alert-success">Successfully posted</Alert>
      );
      break;
    case 500:
      setUploadStatus(
        <Alert className="alert-danger">
          Server Error. Try again later. ErrorCode: {response.status}
        </Alert>
      );
      break;
    case 400:
      setUploadStatus(
        <Alert className="alert-danger">
          Something went wrong. Try again later ErrorCode: {response.status}
        </Alert>
      );
      break;
    case 401:
      setUploadStatus(
        <Alert className="alert-danger">
          You are logged out. Try logging in again. ErrorCode: {response.status}
        </Alert>
      );

      break;
    case 404:
      setUploadStatus(
        <Alert className="alert-danger">
          Not found. ErrorCode: {response.status}
        </Alert>
      );
      break;
    case 403:
      setUploadStatus(
        <Alert className="alert-danger">
          You are not allowed to post. ErrorCode: {response.status}
        </Alert>
      );
      break;
    default:
      <Alert className="alert-danger">
        Something went wrong. ErrorCode: {response.status}
      </Alert>;
  }
};

const NewPost = () => {
  const { userAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [curImg, setCurImg] = useState(no_img);
  const [uploadStatus, setUploadStatus] = useState(null);

  const resetComponent = () => {
    const fileLabel = document.getElementById("file-label");
    const titleIn = document.getElementById("title-in");
    const contentIn = document.getElementById("content-in");

    new Promise((resolve) => {
      setTimeout(resolve, 1000);
    }).then(() => {
      titleIn.value = "";
      contentIn.value = "";
      fileLabel.innerHTML = "Add Image";
      setTitle("");
      setContent("");
      setFile(null);
      setFile(null);
      setCurImg(no_img);
      setUploadStatus(null);

      navigate("/posts", { replace: true });
    });
  };

  const upload = () => {
    if (validation(file, title, content)) {
      const data = new FormData();
      data.append("file", file);
      data.append("title", title);
      data.append("content", content);
      axios({
        url: "/api/post/",
        data: data,
        method: "POST",
      })
        .then((response) => {
          statusAlerts(response, setUploadStatus);
          resetComponent();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const fileHandleChange = (event) => {
    if (event.target.files[0]) {
      const postfix = event.target.files[0].name.split(".")[1];
      if (postfix === "jpeg" || postfix === "jpg" || postfix === "png") {
        setFile(event.target.files[0]);
        setCurImg(URL.createObjectURL(event.target.files[0]));

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

  const titleHandleChange = debounce((event) => {
    setTitle(event.target.value);
    const titleIn = document.getElementById("title-in");
    titleIn.classList.remove("is-invalid");
  }, 250);

  const contentHandleChange = debounce((event) => {
    setContent(event.target.value);
    const contentIn = document.getElementById("content-in");
    contentIn.classList.remove("is-invalid");
  }, 250);

  return (
    <Form>
      {redirect(userAuth.authenticated)}
      <Card className="card d-block shadow-sm">
        <Card.Body className="pb-0">
          <Card.Img
            className="rounded mb-3 img-fluid d-block w-100 mx-auto img-max"
            src={curImg}
            alt="File"
          />

          <Form.Group>
            <div className="custom-file mb-3">
              <input
                type="file"
                name="file"
                id="file-in"
                className="custom-file-input form-control"
                onChange={(event) => fileHandleChange(event)}
              />

            </div>
          </Form.Group>

          <Form.Group>
            <input
              type="text"
              id="title-in"
              placeholder="Title"
              className="form-control mb-2"
              onChange={(event) => titleHandleChange(event)}
            />
            <div className="invalid-feedback mb-3">Enter some Content</div>
          </Form.Group>

          <Form.Group>
            <textarea
              rows="5"
              id="content-in"
              placeholder="Content"
              className="form-control mb-2"
              onChange={(event) => contentHandleChange(event)}
            />
            <div className="invalid-feedback mb-3">Enter some Content</div>
          </Form.Group>

          <Form.Group className="d-flex justify-content-center mb-2">
            <input
              type="button"
              className="btn btn-outline-success d-block w-50"
              value="Post it"
              onClick={upload}
            />
          </Form.Group>
          {uploadStatus}
        </Card.Body>
      </Card>
    </Form>
  );
};

export default NewPost;
