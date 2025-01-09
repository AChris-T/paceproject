import { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { useGetCurrentSubjectQuery } from '../../redux/api/Auth';
import board from '../../assets/PaceAppLogo/board.png';
import { Navigate } from 'react-router-dom';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function Question() {
  const { data, error, isLoading } = useGetCurrentSubjectQuery();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track the current question
  const [selectedOption, setSelectedOption] = useState(null); // Track the selected option
  const [isCorrect, setIsCorrect] = useState(null); // Track if the selected answer is correct

  const TotalQuestion = data?.data?.data?.length || 0;
  const Subject = localStorage.getItem('subjectSelected');

  const handleNextQuestion = () => {
    if (currentQuestionIndex < TotalQuestion - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null); // Reset selected option for the next question
      setIsCorrect(null); // Reset correctness
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(null); // Reset selected option for the previous question
      setIsCorrect(null); // Reset correctness
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    const correctAnswer = data?.data?.data[currentQuestionIndex]?.answer;
    setIsCorrect(option === correctAnswer);
  };

  if (isLoading)
    return (
      <div className="bg-green-Primary_1 h-[100vh] flex-col flex justify-center items-center">
        <img src={board} alt="" />
        <h2 className="font-bold text-white text-[24px] mt-5 tracking-wide ">
          The PaceApp
        </h2>
        <ClipLoader />
      </div>
    );
  if (error)
    return (
      <div>
        Error:{' '}
        {error.status === 403 ? (
          <Navigate to="/login" />
        ) : (
          'Please check your network'
        )}
      </div>
    );

  const currentQuestion = data?.data?.data[currentQuestionIndex]; // Get the current question

  return (
    <div className="flex flex-col h-full mb-[70px]">
      <div className="bg-[#16956C] flex justify-between items-center w-full px-[35px] py-[35px]">
        <h2 className="inter text-white text-[28px]">{Subject}</h2>
        <button className="bg-[#47D1A5] px-10 py-4 rounded-[35px]">End</button>
      </div>
      <p className="mt-[73px] mx-[50px] bg-white shadow-xl z-10 rounded-[35px] w-[50%] px-3">
        Question {currentQuestionIndex + 1} of {TotalQuestion}
      </p>
      <div className="mx-[37px] px-[40px] py-[76px] text-white mt-[-14px] bg-[#167E95] rounded-[10px]">
        <h1 className="mb-6">{currentQuestion?.question}</h1>
      </div>
      <div className="space-y-4 mx-[37px] mt-[22px]">
        {['a', 'b', 'c', 'd'].map((optionKey) => (
          <div
            key={optionKey}
            onClick={() => handleOptionClick(optionKey)}
            style={{
              cursor: 'pointer',
              padding: '10px',
              borderRadius: '5px',
              border: '2px solid #1A97B3',
              backgroundColor:
                selectedOption === optionKey
                  ? isCorrect
                    ? '#39C094'
                    : 'red'
                  : 'white',
              color: selectedOption === optionKey ? 'white' : 'black',
            }}
            className="flex items-center justify-between"
          >
            <span>{currentQuestion?.option?.[optionKey]}</span>
            {selectedOption === optionKey &&
              (isCorrect ? <FaCheck /> : <FaTimes />)}
          </div>
        ))}
      </div>
      <div className="flex justify-between mx-[50px] mt-[20px]">
        <button
          className="bg-[#47D1A5] px-6 py-3 rounded-[35px] disabled:opacity-50"
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        <button
          className="bg-[#47D1A5] px-6 py-3 rounded-[35px] disabled:opacity-50"
          onClick={handleNextQuestion}
          disabled={currentQuestionIndex === TotalQuestion - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}
