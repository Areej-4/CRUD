// In Auth/Signout.js

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

export const Signout = () => {
  const navigate = useNavigate();

  const handleSignout = async () => {
    try {
      const response = await axios.post('http://localhost:3001/signout', {}, { withCredentials: true });
      console.log('Signout response:', response);
      toast.success("User Signout successfully");
      navigate('/login');
    } catch (err) {
      console.error('An error occurred during signout:', err);
    }
  };

  return (
    <button  onClick={handleSignout} className="inline-flex mx-2 items-center bg-[#758694] border-0 py-1 px-3 focus:outline-none hover:bg-[#758694] rounded text-base mt-4 md:mt-0"
   >Sign Out</button>
  );
};
