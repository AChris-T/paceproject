import axios from "axios";

const API_URL = "https://pace-app-j2bo.onrender.com/api/v1/users/";

const signUp = async (phoneNumber,username,password,confirmPassword) =>{
    const response = await axios
        .post(API_URL + "/signup", {
            phoneNumber,
            username,
            password, confirmPassword
        });
    if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
}

const signIn  =async (phoneNumberOrUsername,password) =>{
    const response = await axios
        .post(API_URL + "/login", {
            phoneNumberOrUsername,
            password,
        });
    if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

}

const logout = () =>{
    localStorage.removeItem("user");
};


const getCurrentUser = ()=>{
    return JSON.stringify(localStorage.getItem("user"))
}

const authService = {
    signIn,
    signUp,
    logout,
    getCurrentUser
}

export default authService