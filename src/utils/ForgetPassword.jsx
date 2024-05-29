import { NavLink } from "react-router-dom"

const ForgetPassword = () => {
  return (
    <div className="max-w-[740px] mx-auto shadow-card overflow-x-hidden ">
        <div className="px-8 py-8">
        <h3 className="text-[32px] font-semibold text-[#16956C] mb-10">Forget password</h3>       
        </div>
         <div className="flex flex-col gap-8 bg-green-Primary_1 rounded-t-[40px] h-[85vh] px-8 py-8 ">
            <div className="flex flex-col gap-3">
            <label className="text-[#f2f2f2] font-bold text-[16px]">Phone number</label>
            <input className="bg-transparent border-b-2 font-normal outline-none text-[#FFFFFF]"/>
            <NavLink to="/register" className="flex justify-center items-center w-full font-semibold text-[#f9f9f9] text-[12px] italic">or Create new account</NavLink>

            <div className='relative mt-2 cursor-pointer'>
            <NavLink to="/" className="absolute  bg-white rounded-[50px] w-full h-[50px] flex justify-center items-center text-green-Primary_1 font-bold leading-[31.2px] text-[18px]">Reset Password</NavLink>
            <div  className="z-20 mt-[5px] bg-green-Primary_2 rounded-[50px] w-full h-[50px]"> </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default ForgetPassword
