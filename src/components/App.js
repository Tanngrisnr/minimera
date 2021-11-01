import React, { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { Global, css } from "@emotion/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthProvider } from "../contexts/AuthContext";
import { DataProvider } from "../contexts/DataContext";
import styled from "@emotion/styled";
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

const GlobaStyles = ({ isLanding }) => css`
  html,
  body {
    margin: 0;
    padding: 0;
    font-family: "Roboto", "Helvetica", sans-serif;
  }
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }
  body {
    width: 100vw;
    min-height: 100vh;
    overflow-x: hidden;
    display: flex;
    justify-content: center;
    align-items: stretch;
    text-rendering: optimizeLegibility;
    ${isLanding ? `background-color: #0A8B74` : `background-color: white`};
    ${isLanding ? `color:white` : `color:black`};
  }
  h1,
  h2 {
    font-family: "Belleza", serif;
    font-weight: 400;
    text-align: center;
    width: 100%;
  }
  h2 {
    font-size: 2.5rem;
  }
`;

const StyledMain = styled.main`
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
  }, [location, isLanding]);

  return (
    <>
      <AuthProvider>
        <DataProvider>
          <ThemeProvider theme={themeConfig}>
            <Global styles={GlobaStyles({ isLanding })} />
            <StyledMain>
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRoute path="/about" component={About} />
                <PrivateRoute path="/create-ad" component={CreateAd} />
                <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute
                  path="/update-profile"
                  component={UpdateProfile}
                />
                <PrivateRoute path="/ad/:id" component={AdPage} />
                <Route path="/landing" component={Landing} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
              </Switch>
            </StyledMain>
            <Navigation />
          </ThemeProvider>
        </DataProvider>
      </AuthProvider>
    </>
  );
}

export default App;
