import React from "react";

import Grid from "@material-ui/core/Grid";

import Navbar from "../components/Navbar";
import InputPost from "../components/InputPost";
import PostList from "../components/PostList";

function MainView() {
  return (
    <Grid container>
      <Navbar />

      <InputPost />

      <PostList />
    </Grid>
  );
}

export default MainView;
