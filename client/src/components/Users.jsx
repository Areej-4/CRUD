import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001")
      .then(result => setUsers(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete("http://localhost:3001/deleteUser/" + id)
      .then(res => {
        console.log(res);
        // Without Refreshing just update the array of users   &  //window.location.reload(); for Reloading the page
        setUsers(users.filter(user => user._id !== id));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="flex justify-center items-center mx-4 mt-20 overflow-hidden md:mx-20">
      <table className="w-3/4 table-fixed rounded-lg border-collapse overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">Name</th>
            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">Email</th>
            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {users.map((x, index) => (
            <tr key={index}>
              <td className="py-4 px-6 border-b border-gray-200">{x.name}</td>
              <td className="py-4 px-6 border-b border-gray-200 truncate">{x.email}</td>
              <td className="py-4 px-6 border-b border-gray-200">
                <Link to="/create"><button type="button" className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-3 py-2 me-2 mb-2">Add+</button></Link>
                <Link to={`/update/${x._id}`}><button type="button" className="text-white bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm px-3 py-2 me-2 mb-2">Update</button></Link>
                <button type="button" onClick={() => handleDelete(x._id)} className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-3 py-2 me-2 mb-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;

//Handledeleite is a function that is used to delete the user from the database.
