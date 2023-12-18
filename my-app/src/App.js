import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import ErrorPage from "./pages/errorPage/Error";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";
function App() {

  const { user } = useContext(AuthContext);




  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/messenger" element={!user ? <Navigate to="/" /> : <Messenger />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="*" element={<ErrorPage />} />

      </Routes>
    </Router>
  );
}
export default App;
