import React, { useState } from 'react'
import profileImg from "../../assets/Images/profImg.png"
import { ToastContainer, toast } from "react-toastify"
import { PacmanLoader } from "react-spinners"
import 'react-toastify/dist/ReactToastify.css';

const Profile = ({nextStep, handleChange, values}) => {
  const [state,setState] = useState({
    loading:false
})
  return (
    <form>
    <div className='max-w-[740px] mx-auto shadow-card overflow-x-hidden flex flex-col px-[32px] py-[31px] bg-[#F9F9F9]'>
        <div className='flex items-center justify-between'>
            <h3 className='myFont text-[#16956C] text-[32px]'>Complete profile</h3>
            <h2 className='font-semibold text-[16px] text-[#4B4D52]'>1/3</h2>
        </div>  
        <div className='flex items-center text-center '>
            <h3 className='font-normal text-[#4B4D52] text-[18px]'>Let's know you better</h3>
            <h2 className='w-[10px] h-[10px] mt-[-10px]'>😏</h2>
        </div>
        <div className='mt-[24px] cursor-pointer'>
          <img src={profileImg} alt='img'/>
        </div>
        <div className='flex flex-col mt-[27px] gap-[14px]'>
          <div className='flex flex-col w-full'>
            <label className='text-[16px] font-normal text-[#4f4f4f] '>Surname</label>
            <input
            required             
            value={values.firstName}
            onChange={handleChange("firstName")}
            className='h-[31px] border-b 
            border-b-[#BDBDBD] bg-transparent 
            outline-none text-[16px] font-bold'
            />
          </div>
          <div className='flex flex-col w-full'>
            <label className='text-[16px] font-normal text-[#4f4f4f] '>First Name</label>
            <input
            required             
            value={values.lastName}
            onChange={handleChange("lastName")}
            className='h-[31px] border-b 
            border-b-[#BDBDBD] bg-transparent 
            outline-none text-[16px] font-bold'
              
            />
          </div>
          <div className='flex flex-col w-full'>
            <label className='text-[16px] text-[#4f4f4f] '>Email</label>
            <input
            required
            type='email'
            value={values.email}
            onChange={handleChange('email')}
             className='h-[31px] border-b
              border-b-[#BDBDBD] bg-transparent 
              outline-none text-[16px] font-bold'
                
              />
          </div>
          <div className='flex flex-col w-full'>
            <label className='text-[16px] text-[#4f4f4f] '>Gender</label>
            <select
              required
              value={values.gender}
              onChange={handleChange('gender')}
              className='h-[31px] border-b
               border-b-[#BDBDBD] text-[16px] 
               font-bold bg-transparent outline-none'
              >
                <option value=''></option>
                 <option value="male">male</option>
                 <option value="female">female</option>
             </select>         
           </div>
           <div className='flex flex-col w-full'>
            <label className='text-[16px] text-[#4f4f4f] '>Date of birth</label>
                <input
                value={values.dateOfBirth}
                type='date'
                onChange={handleChange('dateOfBirth')}
                 id="birthday"
                  name="birthday"
                   className='h-[31px]
                    border-b border-b-[#BDBDBD]
                     bg-transparent outline-none 
                     text-[16px] font-bold'
                      
                /> 
           </div>
           <div className='flex flex-col w-full'>
            <label className='text-[16px] text-[#4f4f4f] '>Level of study</label>
            <select
            value={values.levelOfStudy}
            onChange={handleChange('levelOfStudy')}
             id="options"
              name="Gender" 
              className='h-[31px] border-b
               border-b-[#BDBDBD] bg-transparent
                outline-none text-[16px] font-bold'
                >
                 <option value=''>Select Level of Study</option>
                 <option value="ALevel">A'Level</option>     
                 <option value="waec">waec</option>
                 <option value="neco">neco</option>
                 
             </select>         
           </div>
           <div className='relative mt-[28px] cursor-pointer'>
            <button 
              onClick={nextStep}
            disabled={state.loading} 
              className="absolute  bg-green-Primary_1
              rounded-[50px] w-full h-[50px] 
              flex justify-center items-center
              text-white font-bold
               leading-[31.2px] text-[18px]"
               >
              {state.loading ? (
              <PacmanLoader size={17} color={"#16956C"}/>
              ):(
                "Continue"
            )}
              </button>
            <div  className="z-20 mt-[5px] bg-green-Primary_2 rounded-[50px] w-full h-[50px]"> </div>
        </div>
        </div>
        <div>

        </div>
    </div>
    </form>
  )
}

export default Profile
