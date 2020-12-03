import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/firestore";
import firebaseConfig from "./config/firebase";

import { Provider } from "react-redux";
import store from "./redux/store";

import CircularProgress from "@material-ui/core/CircularProgress";

import MainView from "./views/MainView";
import PostView from "./views/PostView";
import LoginView from "./views/LoginView";

function App() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      setLoading(false);
    }
  }, []);

  if (isLoading) return <CircularProgress />;
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/login">
            <LoginView />
          </Route>
          <Route exact path="/">
            <MainView />
          </Route>
          <Route path="/posts/:id">
            <PostView />
          </Route>
          <Route path="*">
            <MainView />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
