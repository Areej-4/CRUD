import { Route, Routes } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateUser from "./components/UpdateUser"
import CreateUser from "./components/CreateUser"
import Users from "./components/Users"
import UpdatePassword from "./components/UpdatePassword"
import { Login } from "./Auth/Login";
import { Register } from "./Auth/Register";
const App = () => {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Users/>}></Route>
      <Route path="/create" element={<CreateUser/>}></Route>
      <Route path="/update/:id" element={<UpdateUser/>}></Route>
      <Route path="/updatePassword/:id" element={<UpdatePassword />} />
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
