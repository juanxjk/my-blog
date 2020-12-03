import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store";

import MainView from "./views/MainView";
import PostView from "./views/PostView";
import LoginView from "./views/LoginView";

function App() {
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
