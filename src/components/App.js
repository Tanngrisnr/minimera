import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { DataProvider } from "../contexts/DataContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
import { createGlobalStyle } from "styled-components";

const FullSize = createGlobalStyle`

 
  html, body {
    margin: 0;
    padding: 0;
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
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
`;

const themeConfig = createTheme({
  palette: {
    primary: {
      main: "#0A8B74",
      light: "#EBF4F3",
    },
  },
  typography: {
    h1: {
      fontFamily: '"Belleza", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
    },
    h2: {
      fontFamily: '"Belleza", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    body1: {
      fontSize: 14,
    },
    body2: {
      fontSize: 16,
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <CssBaseline />
        <ThemeProvider theme={themeConfig}>
          <FullSize />
          <StyledMain>
            <Router>
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRoute path="about" component={About} />
                <PrivateRoute path="/create-ad" component={CreateAd} />
                <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute
                  path="/update-profile"
                  component={UpdateProfile}
                />
                <PrivateRoute path="/ad/:id" component={AdPage} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
              </Switch>
              <Navigation />
            </Router>
          </StyledMain>
        </ThemeProvider>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
