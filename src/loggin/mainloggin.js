import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Redirect,
  HashRouter
} from "react-router-dom";
import MainRouter from "../mainpage/mainrouter";
import Logging from "./Loggingpage";

function MainComp() {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route path="/" component={Logging} exact />
          <Route path="/main/:name?" component={MainRouter} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default MainComp;
