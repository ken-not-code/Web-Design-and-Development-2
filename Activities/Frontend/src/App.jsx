import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  console.log(user);
  useEffect(() => {
    const fecthUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await axios.get("/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
        } catch (err) {
          setError("failed to fetch user data");
          localStorage.removeItem("token");
        }
      }
    };
    fecthUser();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home user={user} error={error} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
