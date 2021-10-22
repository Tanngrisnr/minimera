import React, { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import styled from "styled-components";
import { CssBaseline } from "@mui/material";
import Signup from "./Signup";
import Login from "./Login";
import Profile from "./Profile";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import Dashboard from "./Dashboard";
import CreateAd from "./CreateAd";
import Navigation from "./Navigation";
import AdPage from "./AdPage";
import About from "./About";
import Landing from "./Landing";
import { createGlobalStyle, ThemeProvider } from "styled-components";

const FullSize = createGlobalStyle`

 
  html, body {
    margin: 0;
    padding: 0;
    background-color: ${({ isLanding, theme }) =>
      isLanding ? theme.primary : "white"};
  }
*, *::after, *::before {
    box-sizing: border-box;

  }
 body {
    display: flex;
    justify-content: center;
    align-items: stretch;
    height: 100vh;
    text-rendering: optimizeLegibility;

  }


`;

const StyledMain = styled.main`
  color: ${({ islanding }) => (islanding ? "white" : null)};
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
`;

const appTheme = {
  primary: "#0A8B74",
};

function App() {
  const location = useLocation();
  const [isLanding, setIsLanding] = useState(false);

  useEffect(() => {
    if (location.pathname === "/landing") {
      setIsLanding(true);
    } else {
      setIsLanding(false);
    }
    console.log(isLanding);
  }, [location]);

  return (
    <>
      <ThemeProvider theme={appTheme}>
        <FullSize isLanding={isLanding} />
        <StyledMain>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute path="/about" component={About} />
            <PrivateRoute path="/create-ad" component={CreateAd} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <PrivateRoute path="/ad/:id" component={AdPage} />
            <Route path="/landing" component={Landing} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
          <Navigation />
        </StyledMain>
      </ThemeProvider>
    </>
  );
}

export default App;
