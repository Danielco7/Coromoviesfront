import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";
import MainRouter from "../mainpage/mainrouter";
import Logging from "./Loggingpage";

function MainComp() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" component={Logging} exact />
          <Route path="/main/:name?" component={MainRouter} />
        </Switch>
      </Router>
    </div>
  );
}

export default MainComp;
