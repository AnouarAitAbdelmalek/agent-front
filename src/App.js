import React from "react";
import { Switch, Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import "./App.css";

import Logout from "./logout/Logout";
import Login from "./login/Login";
import formulaire from "./formulaire/formulaire";
import ListClient from "./formulaire/ListClient";
import premiereAuth from "./formulaire/premiereAuth";


function App() {

  let isLogged = sessionStorage.getItem('username') != null ? true : false;
  let provisoire = sessionStorage.getItem('provisoire');

  return (
    
    <Router>
      {isLogged = sessionStorage.getItem('username') != null ? true : false}
            <Switch>
              <Route path="/login" exact component={Login} >
              {isLogged=== true ? (provisoire === "true" ?<Redirect to="/premiereAuth" /> : <Redirect to="/list" />) : ""}
              </Route>
              <Route path="/" exact >
              {isLogged=== false ? <Redirect to="/login" /> : <Redirect to="/list" />}
              </Route>
              <Route path="/form" exact component={formulaire} >
                {isLogged=== false ? <Redirect to="/login" /> : ""}
              </Route>
              <Route path="/list" exact component={ListClient} >
                {isLogged=== false ? <Redirect to="/login" /> : ""}
              </Route>
              <Route path="/logout" exact component={Logout} >
              </Route>
              <Route path="/premiereAuth" exact component={premiereAuth} >
              {isLogged=== false ? <Redirect to="/login" /> : "" }
              </Route>
            </Switch>
    </Router>
  );
}

export default App;
