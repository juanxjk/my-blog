import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import * as authActions from "../redux/actions/auth";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import SessionRepository from "../repositories/SessionRepository";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Licensed under the MIT License.  "}
      <Link color="inherit" href="#">
        My Blog{" "}
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
    textAlign: "center",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function LoginView() {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const history = useHistory();

  const authUser = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (authUser) history.push("/");

  function login() {
    console.log("LOGIN!");
    dispatch(authActions.login({ email, pass }));
    history.push("/");
  }
  const handleGoogleSignIn = async () => {
    const user = await SessionRepository.loginWithGoogle();
    if (user) {
      dispatch(authActions.login(user));
      history.push("/");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            disabled
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            disabled
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
          <FormControlLabel
            disabled
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<AssignmentIndIcon />}
            onClick={handleGoogleSignIn}
          >
            Sign in with google account
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled
            onClick={login}
          >
            Sign In
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default LoginView;
