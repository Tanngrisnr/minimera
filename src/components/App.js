import { AuthProvider } from "../contexts/AuthContext";
import Signup from "./Signup";

function App() {
  return (
    <AuthProvider>
      <main>
        <Signup />
      </main>
    </AuthProvider>
  );
}

export default App;
