import { NavLink } from "react-router-dom"
import FacebookSign from "../components/Icons/FacebookSign"
import Google from "../components/Icons/Google"

const Login = () => {
  return (
    <div className="flex flex-col gap-8 bg-green-Primary_1 rounded-t-[40px] h-[85vh] px-8 py-8 ">
      <div className="flex flex-col gap-3">
      <label className="text-[#f2f2f2] font-bold text-[16px] text-start">Phone number</label>
      <input className="bg-transparent border-b-2 font-normal outline-none text-[#FFFFFF]"/>
      </div>
      <div className="flex flex-col gap-3">
      <label className="text-[#f2f2f2] font-bold text-[16px] text-start">Password</label>
      <input className="bg-transparent border-b-2 outline-none font-normal text-[#FFFFFF]"/>
      </div>
      <div className='relative mt-2 cursor-pointer'>
            <NavLink to="/login" className="absolute  bg-white rounded-[50px] w-full h-[50px] flex justify-center items-center text-green-Primary_1 font-bold leading-[31.2px] text-[18px]">Sign In</NavLink>
            <div  className="z-20 mt-[5px] bg-green-Primary_2 rounded-[50px] w-full h-[50px]"> </div>
        </div>
        <NavLink to="/Forget-password" className="flex justify-center items-center w-full font-semibold text-[#f9f9f9] text-[14px] italic">Forget password?</NavLink>
        <div className="flex justify-around flex-row items-center gap-2">
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
  )
}

export default Login
