import { NavLink, useNavigate } from "react-router-dom"
import FacebookSign from "../components/Icons/FacebookSign"
import Google from "../components/Icons/Google"
import { useState } from "react"
import authService from "./authService"
import { PacmanLoader} from "react-spinners"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const [ state, setState] = useState({
    phoneNumberOrUsername:"",
    password:"",
    loading:false,
    error:"",
  })
  
  const navigate = useNavigate();

  const handleIputChange = (e) =>{
    const {name, value} = e.target;
    setState((prevState)=>({
      ...prevState,
      [name]:value
    }))
  }

  const handleLogin = async (e) =>{
    e.preventDefault();
    setState((prevState)=>({...prevState,loading:true}))
    try{
      await authService.signIn(state.phoneNumberOrUsername,state.password)
      .then(
        ()=>{
          setState((prevState) => ({ ...prevState, loading: false }));
          navigate("/app");
          window.location.reload();
        },
        (error)=>{
          setState((prevState)=>({
            ...prevState,
            loading:false,
          }))
            toast.error("Invalid User Details ");
       
        }
      );
    }
      catch(err){
        setState((prevState) => ({
          ...prevState,
          loading: false,
        }));
        toast.error("An unexpected error occurred Please check your Network.");
      }
  }

  return (
    <>
    <ToastContainer />
    <div className="flex flex-col gap-8 bg-green-Primary_1 rounded-t-[40px] h-[85vh] px-8 py-8 ">
    <form onSubmit={handleLogin} className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
      <label className="text-[#f2f2f2] font-bold text-[16px] text-start">Phone number</label>
      <input
      name="phoneNumberOrUsername"
       placeholder="phoneNumber"
       value={state.phoneNumberOrUsername}
       onChange={handleIputChange}
       className="bg-transparent border-b-2 font-normal outline-none text-[#FFFFFF]"/>
      </div>
      <div className="flex flex-col gap-3">
      <label className="text-[#f2f2f2] font-bold text-[16px] text-start">Password</label>
      <input
      name="password"
      type="password"
      placeholder="password"
      value={state.password}
      onChange={handleIputChange} 
      className="bg-transparent border-b-2 outline-none font-normal text-[#FFFFFF]"/>
      </div>
      <div className='relative mt-2 cursor-pointer'>
            <button disabled={state.loading} className="absolute  bg-white rounded-[50px] w-full h-[50px] flex justify-center items-center text-green-Primary_1 font-bold leading-[31.2px] text-[18px]">
            {state.loading ? (
              <PacmanLoader size={17} color={"#16956C"}/>
              ):(
                "Sign In"
            )}
            
            </button>
            <div  className="z-20 mt-[5px] bg-green-Primary_2 rounded-[50px] w-full h-[50px]"> </div>
        </div>
        </form>
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
            <Google className=" bg-[#E1E4EB] h-[22px] w-[22px] "/>
          </button>        
          </div>


        
    </div>
    </>
  )
}

export default Login
