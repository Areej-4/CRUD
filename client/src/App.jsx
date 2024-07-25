import { Route, Routes, Navigate } from "react-router-dom"
import{ useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateUser from "./components/UpdateUser"
import CreateUser from "./components/CreateUser"
import Users from "./components/Users"
import UpdatePassword from "./components/UpdatePassword"
import { Login } from "./Auth/Login";
import { Register } from "./Auth/Register";
import { Logout } from "./Auth/Logout";
import { SessionCheck } from "./Auth/SessionCheck";
const App = () => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const loggedInUser = await SessionCheck();
      setUser(loggedInUser);
      setLoading(false);
    };
    fetchSession();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Routes>
      <Route path="/" element={user ? < Users/> : <Navigate to="/login" />} />
      <Route path="/create" element={<CreateUser/>}></Route>
      <Route path="/update/:id" element={<UpdateUser/>}></Route>
      <Route path="/updatePassword/:id" element={<UpdatePassword />} />
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="/logout" element={<Logout/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
