import logo from "./logo.svg";
import "./App.css";
import User from "./components/User";
import UserList from "./pages/userlist";
import CategoryList from "./pages/categorylist";
import Login from "./pages/login";
import Home from "./pages/home";
import { Route, Routes } from "react-router-dom";
import RegisterUser from "./pages/register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
