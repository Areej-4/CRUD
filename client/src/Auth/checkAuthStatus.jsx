import axios from "axios"

export const checkAuthStatus =async () => {
try{
    const response=await axios.get('/http://localhost:3001/authstatus',{withCredentials:true});
    return response.data.authenticated;
}
catch(err){
    return false;
}
};

