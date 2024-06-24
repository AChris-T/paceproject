import axios from "axios";

const API_URL = "https://pace-app-j2bo.onrender.com/api/v1/users/activity/";

const SUBJECT_API_URL = "https://pace-app-j2bo.onrender.com/api/v1/creators/subjects"

const getToken = ()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user.token : "";
}
const saveProfile = async (profileData) => {
    const token = getToken();
    console.log('Token:', token); // Debugging: Log the token

    try {
        const response = await axios.patch(API_URL + "update-profile", profileData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        console.log('Response:', response); // Debugging: Log the response

        if (response.status !== 200) {
            console.error('Error response:', response.data);
            throw new Error('Failed to update profile');
        }
        return response.data;
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

const fetchSubjects = async () => {
    const token = getToken();
    const response = await axios.get(SUBJECT_API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        
    });
    
    console.log(response)
    return response.data;
};
const profileService ={
    saveProfile,
    fetchSubjects,
}

export default profileService