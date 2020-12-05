import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";

import { useSelector } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CircularProgress from "@material-ui/core/CircularProgress";

import Navbar from "../components/Navbar";

import PostRepository from "../repositories/PostRepository";

function PostView() {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [_post, setPost] = useState();
  const authUser = useSelector((state) => state.auth);

  useEffect(() => {
    setLoading(true);
    PostRepository.findByID(id)
      .then((post) => {
        const viewedPost = { ...post, views: post.views + 1 };
        setPost(viewedPost);
        PostRepository.update(viewedPost);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  }, []);

  if (!isLoading && !_post) return <Redirect to="/" />;

  return (
    <Grid container justify="center">
      <Navbar />
      {isLoading ? (
        <CircularProgress />
      ) : (
        _post && (
          <Grid item sm={12}>
            <Typography variant="h1">{_post.title}</Typography>
            <Typography>views: {_post.views} </Typography>
            <Typography>
              {new Date(_post.createdAt).toLocaleString("en", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>
            <Typography variant="h4" paragraph>
              {_post.content}
            </Typography>

            {authUser && (
              <Button
                variant="contained"
                color="secondary"
                justify="center"
                startIcon={<FavoriteIcon />}
                onClick={() => {
                  const likedPost = { ..._post, likes: _post.likes + 1 };
                  setPost(likedPost);
                  PostRepository.update(likedPost);
                }}
              >
                Like ({_post.likes})
              </Button>
            )}
          </Grid>
        )
      )}
    </Grid>
  );
}

export default PostView;
