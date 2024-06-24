import React, { useState } from 'react'
import ArtIcon from  "../../assets/Images/ArtIcon.png"
import ScienceIcon from  "../../assets/Images/sciImg.png"
import CommercialIcon from  "../../assets/Images/commImg.png"
import { PacmanLoader } from "react-spinners"
import 'react-toastify/dist/ReactToastify.css';

const Department = ({ nextStep, prevStep, handleChange, values }) => {
    const [selectedDepartment, setSelectedDepartment] = useState(values.department);
    const [loading, setLoading] = useState(false);
    
    const [state,setState] = useState({
        loading:false,
        selectedDepartment:'',
    });
    const handleDepartmentClick = (e) => {
        e.preventDefault();
        if (selectedDepartment) {
          handleChange(selectedDepartment);
          nextStep();
        }
      };
    
      const handleRadioChange = (e) => {
        setSelectedDepartment(e.target.value);
      };
    
   
  return (
    <form onSubmit={handleDepartmentClick}>
    <div className='max-w-[740px] h-[100vh] mx-auto shadow-card overflow-x-hidden flex flex-col px-[32px] py-[31px] bg-[#F9F9F9]'>
    <div className='flex items-center justify-between mb-[10px]'>
        <h3 className='myFont text-[#16956C] text-[32px]'>Choose <br/> Department</h3>
        <h2 className='font-semibold text-[16px] text-[#4B4D52]'>2/3</h2>
    </div> 
    
    <h5 className='text-[#4B4D52] text-[18px] '>Choose one option</h5>    
        <label id='art' className='mt-3' >
            <input 
                type='radio'
                id='art' 
                className='hidden'
                value='arts'
                name='department'
                checked={selectedDepartment === "arts"}
                onChange={handleRadioChange}


             />
            <div className={`flex rounded-[10px] px-[30px] ${selectedDepartment === 'arts' ? ' border-[#16956C] border-[2px]' : ''} bg-gradient-to-r from-[#FD277C] to-[#FF7455] justify-between items-center w-full h-[80px]`}>
                <h3 className='text-[24px] text-white font-bold'>Arts</h3>
                <img src={ArtIcon} alt='art icon'/>
            </div>
        </label>
        <label  id='science' className='mt-3'>
            <input 
                type='radio'
                id='science' 
                className='hidden'
                value='sciences'
                name='department'
                checked={selectedDepartment === "sciences"}
                onChange={handleRadioChange}

            />
            <div className={`flex rounded-[10px] px-[30px] ${selectedDepartment === 'sciences' ? 'border-[2px] border-[#16956C]' : ''} bg-gradient-to-r from-[#DB9224] to-[#EDE527] justify-between items-center w-full h-[80px]`}>
                <h3 className='text-[24px] text-white font-bold'>Science</h3>
                <img src={ScienceIcon} alt='art icon'/>
            </div>
        </label>
        <label className='mt-3' id='Commercials'>
            <input 
                type='radio'
                id='Commercials' 
                className='hidden'
                value='commercials'
                name='department'
                checked={selectedDepartment === "commercials"}
                onChange={handleRadioChange}/>
            <div className={`flex rounded-[10px] px-[30px] ${selectedDepartment === 'commercials' ? 'border-[2px] border-[#16956C]' : ''} bg-gradient-to-r from-[#7C48C3] to-[#B16CDC] justify-between items-center w-full h-[80px]`}>
                <h3 className='text-[24px] text-white font-bold'>Commercial</h3>
                <img src={CommercialIcon} alt='art icon'/>
            </div>
        </label>
        <div className='relative mt-[28px] cursor-pointer'>
            <button 
            disabled={!selectedDepartment || state.loading} 
            onClick={handleDepartmentClick} 
            className={`absolute rounded-[50px] w-full h-[50px] flex justify-center items-center text-white font-bold leading-[31.2px] text-[18px] ${
              selectedDepartment ? 'bg-green-Primary_1' : 'bg-[#F2F2F2]'
            }`}
               >
              {state.loading ? (
              <PacmanLoader size={17} color={"#16956C"}/>
            ) : (
              "Continue"
            )}
              </button>
            <div  className={`z-20  mt-[6px] ${selectedDepartment ? 'bg-green-Primary_2' : 'bg-[#A9AEB8]'}   rounded-[50px] w-full h-[50px]`}> </div>
        </div>
        <button onClick={prevStep} className='mt-2 text-[#16956C]'>Back</button>

 </div>
    </form>
  )
}

export default Department
