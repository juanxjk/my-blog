import React, { useState } from "react";
import { useSelector } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import PostRepository from "../repositories/PostRepository";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    margin: "50px 0px",
  },
  buttonContainer: {
    display: "flex",
    flex: "1 1 auto",
    justifyContent: "space-around",
  },
  button: {
    display: "box",
  },
}));

function InputPost() {
  const classes = useStyles();

  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [inputStatus, setInputStatus] = useState("");

  const authUser = useSelector((state) => state.auth);

  const _cleanForm = () => {
    setPostTitle("");
    setPostContent("");
  };

  const _createPost = () => {
    const createdAt = Date.now();
    const createdBy = authUser.id;
    const title = postTitle;
    const content = postContent;
    const likes = 0;
    const views = 0;
    const post = { title, content, likes, views, createdAt, createdBy };
    return post;
  };

  const CancelButton = () => (
    <Button
      className={classes.button}
      variant="contained"
      color="secondary"
      onClick={() => {
        _cleanForm();
      }}
    >
      Cancel
    </Button>
  );

  const SaveButton = () => (
    <Button
      className={classes.button}
      variant="contained"
      color="primary"
      onClick={(event) => {
        setInputStatus("Sending...");
        PostRepository.save(_createPost())
          .then(() => {
            _cleanForm();
            setInputStatus("Sent :)");
          })
          .catch(() => {
            setInputStatus("Post sending has fail! Try again.");
          });
        setTimeout(() => {
          setInputStatus("");
        }, 3000);
      }}
    >
      Publish
    </Button>
  );

  if (authUser)
    return (
      <Container>
        <Grid container sm={12} className={classes.root}>
          <Grid item sm={12}>
            <Typography variant="h4">Make a new post</Typography>
          </Grid>
          <Grid item sm={12}>
            <Typography variant="h5">Title</Typography>
            <TextField
              fullWidth
              id="outlined-textarea"
              label="Type here your post title"
              placeholder="Title of my post"
              multiline
              rows="1"
              margin="normal"
              variant="outlined"
              onChange={(event) => setPostTitle(event.target.value)}
              value={postTitle}
            />
          </Grid>
          <Grid item sm={12}>
            <Typography variant="h5">Content</Typography>
            <TextField
              fullWidth
              id="outlined-textarea"
              label="Type here your post content"
              placeholder="Content of my post"
              multiline
              rows="10"
              margin="normal"
              variant="outlined"
              onChange={(event) => setPostContent(event.target.value)}
              value={postContent}
            />
          </Grid>
          <Grid container sm={12} className={classes.buttonContainer}>
            <SaveButton />
            <CancelButton />
          </Grid>
          <Grid container sm={12} className={classes.buttonContainer}>
            <Typography>{inputStatus}</Typography>
          </Grid>
        </Grid>
      </Container>
    );
}

export default InputPost;
