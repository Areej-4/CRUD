import axios from "axios";

export const SessionCheck = async () => {
  try {
    const response = await axios.get("http://localhost:3001/session-check", { withCredentials: true });
    return response.data.user;
  } catch (error) {
    console.error("Session check failed:", error);
    return null;
  }
};
