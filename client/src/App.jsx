import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateUser from "./components/UpdateUser";
import CreateUser from "./components/CreateUser";
import Users from "./components/Users";
import UpdatePassword from "./components/UpdatePassword";
import { Login } from "./Auth/Login";
import { Register } from "./Auth/Register";
import { Signout } from "./Auth/Signout";
import { useEffect, useState } from "react";
import { checkAuthStatus } from "./Auth/checkAuthStatus";
import { useGlobalAuthContext } from "./context/authContext";

const App = () => {
  const { auth } = useGlobalAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  console.log(auth, "auth?");

  if (auth === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={auth ? <Users /> : <Login />} />
        <Route path="/create" element={auth ? <CreateUser /> : <Login />} />
        <Route path="/update/:id" element={auth ? <UpdateUser /> : <Login />} />
        <Route
          path="/updatePassword/:id"
          element={auth ? <UpdatePassword /> : <Login />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signout" element={auth ? <Signout /> : <Login />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
