import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const UpdateUser = () => {
  const {id}=useParams()
  const [name,setName]= useState()
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  const navigate=useNavigate()
  
  useEffect(()=>{
    axios.get("http://localhost:3001/getUser/" +id)
    .then(result=>{console.log(result)
      setName(result.data.name)
      setEmail(result.data.email)
      setPassword(result.data.password)
    })
    .catch(err=>console.log(err))
    
  },[])

  const Update=(e)=>{
    e.preventDefault();
    axios.put("http://localhost:3001/updateUser/"+id,{name,email,password})
    .then(result=>{
      console.log(result)
      navigate('/')
    })
    .catch(err=>console.log(err))

  }
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Update User
            </h1>
            <form onSubmit={Update} className="space-y-4 md:space-y-6" action="#">
            <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                <input type="text" name="name" id="name" value={name} onChange={(e)=>setName(e.target.value)}  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" style={{ paddingLeft: '10px' }} placeholder="Please Enter Name" required />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" style={{ paddingLeft: '10px' }} placeholder="name@company.com" required />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" style={{ paddingLeft: '10px' }} required />
              </div>
              <button type="submit" className="w-full bg-[#DDDDDD] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>
            </form>
          </div>
        </div>
      </div>
  )
}

export default UpdateUser
