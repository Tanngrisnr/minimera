import React, { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "styled-components";
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

const themeConfig = createTheme({
  palette: {
    primary: {
      main: "#0A8B74",
    },
  },
});

const FullSize = createGlobalStyle`

 
  html, body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', 'Helvetica', sans-serif;
    color: ${({ isLanding }) => (isLanding ? "white" : "black")};
    width: 100vw;
    height: 100vh;
  }
*, *::after, *::before {
    box-sizing: border-box;

  }
 body {
    display: flex;
    justify-content: center;
    align-items: stretch;
    text-rendering: optimizeLegibility;
    background-color: ${({ isLanding }) => (isLanding ? "#0A8B74" : "white")};

  }
  h1, h2 { 
    font-family: 'Belleza', serif;
    font-weight:400;
    text-align:center;
    width:100%;
  }
  h2 {
    font-size:2.5rem;
  }
  a {
    color: "#0A8B74";
  }
  a:visited {
    color: "#076151";
  }


`;

const StyledMain = styled.main`
  color: ${({ islanding }) => (islanding ? "white" : null)};
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 95%;
  margin: 0 auto;
  height: 100%;
  justify-content: center;
`;

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
  }, [location, isLanding]);

  return (
    <>
      <ThemeProvider theme={themeConfig}>
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
