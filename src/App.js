import logo from "./logo.svg";
import "./App.css";
import AppRoutes from "./routes/routes";
import { BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <Router>
      <div>
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
