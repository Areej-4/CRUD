// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import axios from "axios";

// export const Logout = () => {
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await axios.post("http://localhost:3001/logout", {}, { withCredentials: true });
//       toast.info("User signed out successfully");
//       navigate("/login");
//     } catch (error) {
//       console.error("Error logging out:", error.response ? error.response.data : error.message);
//     }
//   };

//   return (
//     <button onClick={handleLogout} className="inline-flex mx-2 items-center bg-[#758694] border-0 py-1 px-3 focus:outline-none hover:bg-[#758694] rounded text-base mt-4 md:mt-0 logout-button">
//       Logout
//     </button>
//   );
// };
