import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Profile from "./Profile";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <main>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Profile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
          </Switch>
        </AuthProvider>
      </Router>
    </main>
  );
}

export default App;
