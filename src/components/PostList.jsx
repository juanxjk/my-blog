import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import VisibilityIcon from "@material-ui/icons/Visibility";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import CircularProgress from "@material-ui/core/CircularProgress";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

import PostRepository from "../repositories/PostRepository";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    PostRepository.findAll()
      .then((_posts) => setPosts(_posts))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Grid container>
      <Grid item sm={12}>
        <Typography variant="h3">All posts</Typography>
        <Button onClick={fetchPosts} color="default" variant="contained">
          Update
        </Button>
      </Grid>

      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid item sm>
          {posts ? (
            <List>
              {posts.map((post) => (
                <ListItem
                  button
                  component={RouterLink}
                  to={`/posts/${post.id}`}
                >
                  <ListItemIcon>
                    <Brightness1Icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={post.title ? post.title : "Untitled"}
                    secondary={post.createdAt}
                  />
                  <ListItemSecondaryAction>
                    <Grid container justify="space-around">
                      <Grid item>
                        <ThumbUpIcon />
                        <Typography>{post.likes}</Typography>
                      </Grid>
                      <Grid item>
                        <VisibilityIcon />
                        <Typography>{post.views}</Typography>
                      </Grid>
                    </Grid>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>
              Too bad... It seems we don't have any post to show. :(
            </Typography>
          )}
        </Grid>
      )}
    </Grid>
  );
}

export default PostList;
