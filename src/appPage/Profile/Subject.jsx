import React, { useState } from 'react'
import { ImCheckmark } from "react-icons/im";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Subject = ({ prevStep, handleChange, values, subjects, submitForm }) => {
    const [selectedSubjects,setSelectedSubjects] =useState(values.subjectOfInterest);

    const handleSubjectChange = (subjectId) => {
        setSelectedSubjects((prev) => {
          if (prev.includes(subjectId)) {
            return prev.filter((item) => item !== subjectId);
          } else if(prev.length < 4) {
            return [...prev, subjectId];
          }
          return prev;
        });
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        handleChange("subjectOfInterest",selectedSubjects)
        submitForm({ ...values, subjectOfInterest: selectedSubjects });
    }
  return (
    <form onSubmit={handleSubmit}>
    <ToastContainer />

<div className='max-w-[740px] h-[100vh] mx-auto shadow-card overflow-x-hidden flex flex-col px-[32px] py-[31px] bg-[#F9F9F9]'>
    <div className='flex items-center justify-between mb-[10px]'>
        <h3 className='myFont text-[#16956C] text-[32px]'>Choose  your<span className='mt-[-300px]'> Interest</span></h3>
        <h2 className='font-semibold text-[16px] text-[#4B4D52]'>3/3</h2>
    </div> 
    
    <h5 className='text-[#4B4D52] text-[18px] '>Select 4 more prefered interest. <span className='font-semibold'> {selectedSubjects.length}/4 selected</span></h5>    
        <div className='flex items-center justify-between mb-[10px]'>
      </div>
      <div className='flex flex-wrap gap-3'>
        {Array.isArray(subjects) && subjects.length > 0 ? (
          subjects.map(subject => (
            <label id={subject.id} key={subject._id}>
              <div onClick={() =>handleSubjectChange(subject._id)} 
              id={subject.id}
              className={`border flex items-center gap-2 ${selectedSubjects.includes(subject._id) ? 'bg-[#16956C] text-white' : 'bg-gray-200'} rounded-[50px] px-[20px] py-[10px]`}>
              {!selectedSubjects.includes(subject._id) || <ImCheckmark />}
            <h4 className='capitalize text-[16px] font-semibold'>{subject.subject}</h4>
            </div>
            </label>
          ))
        ) : (
          <p>No subjects available.</p>
        )}
      </div>
      <button 
        type="submit" 
        className={`border flex items-center gap-2 ${selectedSubjects ? 'bg-[#16956C] text-white' : 'bg-gray-200'} rounded-[50px] px-[20px] py-[10px]`}
        disabled={selectedSubjects.length === 0}
          >
          Submit
        </button>
    </div>
    </form>
  );
};


export default Subject
