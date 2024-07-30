import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Signout } from "../Auth/Signout";

const Navbar = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const response = await axios.get("http://localhost:3001/profile", { withCredentials: true });
        setEmail(response.data.email);
      } catch (err) {
        console.error('Error fetching email:', err);
      }
    };
    fetchEmail();
  }, []);



  return (
    <header className="text-white body-font bg-[#405D72]">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
          <Link to="/" className="mr-5">Users</Link>
          <Link to="/create" className="mr-5">Create</Link>
          <div>
            {email ? (
              <p>Welcome, {email}</p>
            ) : (
              <p>No user is logged in</p>
            )}
          </div>
        </nav>
        <a className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
          <span className="ml-3 text-2xl text-white">Welcome to Dashboard</span>
        </a>
        <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
        <Signout/>
     
        </div>
      </div>
    </header>
  );
};

export default Navbar;





  // const Signout = () => {
  //   setEmail(''); // Clear the email state
  //   toast.success("User Signout successfully");
  // };


// <Link to="/login">
//             <button 
//               onClick={() => Signout()} 
//               className="inline-flex mx-2 items-center bg-[#758694] border-0 py-1 px-3 focus:outline-none hover:bg-[#758694] rounded text-base mt-4 md:mt-0"
//             >
//               Sign Out
//             </button>
//           </Link>