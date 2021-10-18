import React, { useEffect, useState } from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { DataProvider } from "../contexts/DataContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Signup from "./Signup";
import Login from "./Login";
import Profile from "./Profile";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import Dashboard from "./Dashboard";
import CreateAd from "./CreateAd";
import Navigation from "./Navigation";
import About from "./About";

function App() {
  return (
    <Container>
      <Router>
        <AuthProvider>
          <DataProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="about" component={About} />
              <PrivateRoute path="/create-ad" component={CreateAd} />
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
            <Navigation />
          </DataProvider>
        </AuthProvider>
      </Router>
    </Container>
  );
}

export default App;
