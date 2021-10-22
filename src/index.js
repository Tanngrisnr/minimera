import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <DataProvider>
        <Router>
          <App />
        </Router>
      </DataProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
