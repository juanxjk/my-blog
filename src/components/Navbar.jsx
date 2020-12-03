import React from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../redux/actions/auth";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Navbar() {
  const classes = useStyles();

  const history = useHistory();

  const authUser = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Button className={classes.title} onClick={() => history.push("/")}>
          <Typography variant="h6">My Blog</Typography>
        </Button>

        {authUser ? (
          <Button color="inherit" onClick={() => dispatch(logout())}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" component={RouterLink} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
