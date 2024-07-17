import { Route, Routes } from "react-router-dom"
import UpdateUser from "./components/UpdateUser"
import CreateUser from "./components/CreateUser"
import Users from "./components/Users"
import Navbar from "./components/Navbar"

const App = () => {
  return (
    <div>
    <Navbar/>
      <Routes>
      <Route path="/" element={<Users/>}></Route>
      <Route path="/create" element={<CreateUser/>}></Route>
      <Route path="/update/:id" element={<UpdateUser/>}></Route>
      </Routes>
    </div>
  )
}

export default App
