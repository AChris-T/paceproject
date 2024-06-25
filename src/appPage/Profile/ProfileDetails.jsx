import React, { useEffect, useState } from 'react'
import profileService from '../../utils/auth/ProfileAuth';
import { toast } from 'react-toastify';
import Department from './Department';
import Profile from "./Profile"
import Subject from './Subject';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import authService from '../../utils/auth/authService';

const ProfileDetails = () => {
    const navigate = useNavigate()
    const currentUser = authService.getCurrentUser();

    useEffect(()=>{
      if(!currentUser || currentUser.profileCompleted){
        navigate("/home")
      }
    },[currentUser,navigate])

    const [step,setStep] = useState(1);
    const [ formData,setFormData] = useState({
        firstName: "",
        lastName:"",
        email:"",
        gender:"",
        department:"",
        subjectOfInterest:[],
        dateOfBirth:"",
        levelOfStudy:"",
    });

    const [subjects,setSubjects] = useState([]);

    useEffect(() => {
      const fetchSubjects = async () => {
        try {
          const response = await profileService.fetchSubjects();
          const { subjects } = response.data; // Adjust according to the actual response structure
          setSubjects(subjects);        
      } catch (error) {
          toast.error('Error fetching subjects: ' + (error.response?.data?.message || error.message));
      }
  };
  
  fetchSubjects();
  }, []);
  console.log(subjects)

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleChange = (input) => (e) =>{
        setFormData({
            ...formData,[input]: e.target.value
        })
    }
    const handleDepartmentChange = (department) =>{
       setFormData({...formData,department});
    }
    

    const handleSubjectsChange = (selectedSubjects) =>{
      setFormData({...formData,subjectOfInterest:selectedSubjects})
    }
    const submitProfile = async (data, token) => {
        try {
          console.log('Submitting data:', data);
          await profileService.saveProfile(data, token);
          const updatedUser ={
            ...currentUser,
            profileCompleted:true
          }
          localStorage.setItem("user", JSON.stringify(updatedUser)); 
          toast.success("Profile updated successfully!");
          navigate("/app")
        } 
        catch (error) {
          console.error('Error submitting profile:', error);
          toast.error(error);

        }
      };

  switch (step) {
    case 1:
        return <Profile nextStep={nextStep} handleChange={handleChange} values={formData}/>
    case 2:
        return <Department nextStep={nextStep} prevStep={prevStep} handleChange={handleDepartmentChange} values={formData}/>
    case 3:
        return <Subject prevStep={prevStep} handleChange={handleSubjectsChange} subjects={subjects} values={formData} submitForm={submitProfile}/>
    default:
        return <Profile nextStep={nextStep} handleChange={handleChange} values={formData}/>
    }

}


export default ProfileDetails
