import React from "react";

import { useSelector } from "react-redux";

import Grid from "@material-ui/core/Grid";

import Navbar from "../components/Navbar";
import InputPost from "../components/InputPost";
import PostList from "../components/PostList";

function MainView() {
  const authUser = useSelector((state) => state.auth);

  return (
    <Grid container>
      <Navbar />

      {authUser && <InputPost />}

      <PostList />
    </Grid>
  );
}

export default MainView;
