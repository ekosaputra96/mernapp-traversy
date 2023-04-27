import axios from "axios";

const API_URL = process.env.REACT_APP_SERVER_URL + "api/v1/users/";

// register a new user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData);
    // saving user to local storage
    localStorage.setItem("user", JSON.stringify(response.data.data));
    return response.data;
}

// login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData);
    // saving user to local storage
    localStorage.setItem("user", JSON.stringify(response.data.data));
    return response.data;
}

// logout
const logout = () => {
    localStorage.removeItem("user");
}

const authService = {
    register,
    logout,
    login
}

export default authService;