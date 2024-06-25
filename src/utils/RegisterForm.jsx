import { NavLink, useNavigate } from "react-router-dom"
import FacebookSign from "../components/Icons/FacebookSign"
import Google from "../components/Icons/Google"
import { useState } from "react"
import authService from "./auth/authService"
import { ToastContainer, toast } from "react-toastify"
import { PacmanLoader } from "react-spinners"
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [state,setState] = useState({
    phoneNumber:"",
    username:"",
    password:"",
    confirmPassword:"",
    error:"",
    loading:false
  })

  const navigate = useNavigate()

  const handleIputChange = (e) =>{
    const{name,value} = e.target;
    setState((prevState)=>({
      ...prevState,
      [name]:value
    }))
  }

  const validatePhoneNumber =(phoneNumber)=>{
    const phoneRegax = /^\d{11}$/;
    return phoneRegax.test(phoneNumber)
  }
  const validateUsername = (username) => {
    // Basic validation for username (at least 3 characters)
    return username.length >= 3;
  };

  const handleSignUp = async (e) =>{
    e.preventDefault();
    
    if (!validateUsername(state.username)) {
      toast.error("Username must be at least 3 characters long.");
      return;
    }
    
    if(!validatePhoneNumber(state.phoneNumber)){
      toast.error("Invalid phone number. Please enter a valid 10-digit number.");
      return;
    }
    if (state.password !== state.confirmPassword) {
      toast.error("Passwords do not match. Please check and try again.");
      return;
    }
    setState((prevState)=>({...prevState,loading:true}))
    try{
      await authService.signUp(
        state.phoneNumber,
        state.username,
        state.password,
        state.confirmPassword,
      )
      .then(
        ()=>{
          setState((prevState)=>({...prevState,loading:false}));
          navigate("/profile")
          toast.success("Registration successfull");
        },
        (error)=>{
          setState((prevState)=>({
            ...prevState,
            loading:false,
          }))
          toast.error(error.response.data.message || "Invalid User Details");
        }
      )
    }
      catch(err){
        setState((prevState)=>({
          ...prevState,
          loading:false,
        }))
        toast.error(err.response?.data?.message || "An unexpected error occurred. Please check your network.");

    }
  }
  
  return (
    <div className="flex flex-col gap-8 bg-green-Primary_1 rounded-t-[40px]  px-8 py-8 ">
        <ToastContainer />
      <form onSubmit={handleSignUp} className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
      <label className="text-[#f2f2f2] text-start font-bold text-[16px]">Username</label>
      <input
          name="username"
          value={state.username}
          onChange={handleIputChange} 
          className="bg-transparent
          border-b-2 font-normal outline-none
         text-[#FFFFFF]"
        />
      </div>
      <div className="flex flex-col gap-3">
      <label className="text-[#f2f2f2] 
      text-start font-bold 
      text-[16px]"
      >
      Phone number
      </label>
      <input 
        name="phoneNumber"
        type="phoneNumber"
        value={state.phoneNumber}
        onChange={handleIputChange}
        className="bg-transparent 
        border-b-2 font-normal outline-none 
        text-[#FFFFFF]"
        />
      </div>
      <div className="flex flex-col gap-3">
        <label className="text-[#f2f2f2] 
          text-start font-bold
          text-[16px]">
          Password
        </label>
      <input 
        name="password"
        type="password"
        value={state.password}
        onChange={handleIputChange}
        className="bg-transparent
         border-b-2 outline-none 
         font-normal text-[#FFFFFF]"
          
         />
      </div>
      <div className="flex flex-col gap-3">
      <label 
        className="text-[#f2f2f2]
         text-start font-bold
          text-[16px]">
          Confirrm Password
        </label>
      <input 
       name="confirmPassword"
        type="confirmPassword"
        value={state.confirmPassword}
        onChange={handleIputChange}
        className="bg-transparent
         border-b-2 outline-none 
         font-normal text-[#FFFFFF]"
          
         />
      </div>
      <div className='relative mt-2 cursor-pointer'>
            <button disabled={state.loading} 
              className="absolute  bg-white
              rounded-[50px] w-full h-[50px] 
              flex justify-center items-center
              text-green-Primary_1 font-bold
               leading-[31.2px] text-[18px]"
               >
              {state.loading ? (
              <PacmanLoader size={17} color={"#16956C"}/>
              ):(
                "Sign up"
            )}
              </button>
            <div  className="z-20 mt-[5px] bg-green-Primary_2 rounded-[50px] w-full h-[50px]"> </div>
        </div>
        <NavLink to="/Forget-password" className="flex justify-center items-center w-full font-semibold text-[#f9f9f9] text-[14px] italic">Forget password?</NavLink>
        <div className="flex flex-row items-center justify-around gap-2">
          <div className="bg-[#E1E4EB] w-full h-[1px] rounded-sm"></div>
          <div className="text-[#fff] text-[16px] italic font-normal ">Or</div>
          <div className="bg-[#E1E4EB] w-full h-[1px] rounded-sm"></div>
        </div>
        <div className="flex justify-between gap-5">
          <button className="flex justify-around items-center bg-[#FFFFFF] px-3 rounded-[10px] h-[38px] w-full py-6">
            <h6 className="italic text-[15px] font-bold text-[#16956C] flex items-center justify-center w-full">sign up with</h6>
            <FacebookSign/>
          </button>
          <button className="flex justify-around items-center bg-[#fff] px-3  rounded-[10px] h-[38px] w-full py-6">
          <h6 className="italic text-[15px] font-bold text-[#16956C] flex items-center justify-center w-full">sign up with</h6>
            <Google className=" h-[22px] w-[22px] "/>
          </button>        
          </div>
          </form>
    </div>
  )
}

export default Register
