import { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import { useGetCurrentSubjectQuery } from '../../redux/api/Auth';
import board from '../../assets/PaceAppLogo/board.png';
import { Navigate, useNavigate } from 'react-router-dom';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Question({ text }) {
  const { data, error, isLoading } = useGetCurrentSubjectQuery();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState(
    localStorage.getItem('subjectSelected') || ''
  ); // Track subject state

  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      const newSubject = localStorage.getItem('subjectSelected');
      setSubject(newSubject);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const TotalQuestion = data?.data?.data?.length || 0;
  const Subject = localStorage.getItem('subjectSelected');

  useEffect(() => {
    window.history.pushState(null, null, window.location.href);

    const handlePopState = () => {
      setModalType('back');
      setIsModalVisible(true);
      localStorage.clear('subjectSelected');
    };

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      setModalType('reload');
      setIsModalVisible(true);
      //localStorage.clear('subjectSelected');

      return (event.returnValue = '');
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < TotalQuestion - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsCorrect(null);
    }
  };
  const handleModalAction = (action) => {
    setIsModalVisible(false);
    if (action === 'ok') {
      if (modalType === 'end' || modalType === 'back') {
        navigate('/app/home'); // Redirect to the home page
        localStorage.clear('subjectSelected');
      } else if (modalType === 'reload') {
        window.location.reload(); // Reload the page
      }
    }
  };

  const handleOptionClick = (option) => {
    if (selectedOption) return; // Prevent further selection
    setSelectedOption(option);
    const correctAnswer = data?.data?.data[currentQuestionIndex]?.answer;
    const isAnswerCorrect = option === correctAnswer;
    setIsCorrect(isAnswerCorrect);
    if (isAnswerCorrect) {
      setCorrectAnswers((prev) => prev + 1); // Increment correct answer count
    }
  };

  const handleSubmit = async () => {
    // alert(
    //   `You answered ${correctAnswers} out of ${TotalQuestion} questions correctly.`
    // );
    setLoading(true);
    const token = Cookies.get('authToken');
    if (!token) {
      setLoading(false);
      toast.error('Authentication token not found');
      return;
    }

    const response = await axios.put(
      'https://pace-app-backend-v1.onrender.com/api/v1/student/update/correct-answers',
      {
        questionsAnsweredCorrectly: correctAnswers,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    if (response.status === 200) {
      setLoading(false);
      localStorage.setItem('correctAnswers', correctAnswers);
      localStorage.setItem('totalQuestion', TotalQuestion);
      navigate('/app/result'); // Redirect to the home page
    } else {
      setLoading(false);
      toast.error('An error occured');
    }
  };
  const handleEndClick = () => {
    setModalType('end');
    setIsModalVisible(true);
  };

  if (isLoading)
    return (
      <div className="bg-green-Primary_1 h-[100vh] flex-col flex justify-center items-center">
        <img src={board} alt="" />
        <h2 className="font-bold text-white text-[24px] mt-5 tracking-wide ">
          The PaceApp
        </h2>
        <ClipLoader color="white" />
        <h3 className="text-white">Generating Questions....</h3>
      </div>
    );
  if (error)
    return (
      <div>
        Error:{' '}
        {error.status === 403 ? (
          <Navigate to="/" />
        ) : (
          'Please check your network'
        )}
      </div>
    );

  const currentQuestion = data?.data?.data[currentQuestionIndex];

  return (
    <div className="flex flex-col h-full mb-[70px]">
      <div className="bg-[#16956C] flex justify-between items-center w-full px-[35px] py-[35px]">
        <h2 className="inter text-white text-[28px]">{Subject}</h2>
        <button
          className="bg-[#47D1A5] text-white px-10 py-4 rounded-[35px]"
          onClick={handleEndClick}
        >
          End
        </button>
      </div>
      <p className="mt-[73px] mx-[50px] bg-white shadow-xl z-10 rounded-[35px] w-[50%] px-3">
        Question {currentQuestionIndex + 1} of {TotalQuestion}
      </p>
      <div className="mx-[37px] px-[40px] py-[76px] text-white mt-[-14px] bg-[#167E95] rounded-[10px]">
        <h1
          className="mb-6"
          dangerouslySetInnerHTML={{ __html: currentQuestion?.section }}
        ></h1>
        <h1
          className="mb-6"
          dangerouslySetInnerHTML={{ __html: currentQuestion?.question }}
        ></h1>
      </div>
      <div className="space-y-4 mx-[37px] mt-[22px]">
        {['a', 'b', 'c', 'd'].map((optionKey) => (
          <div
            key={optionKey}
            onClick={() => handleOptionClick(optionKey)}
            style={{
              cursor: selectedOption ? 'not-allowed' : 'pointer',
              padding: '10px',
              borderRadius: '5px',
              border:
                selectedOption === optionKey
                  ? isCorrect
                    ? 'none'
                    : 'none'
                  : '2px solid #1A97B3',
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
            <p>{currentQuestion?.option?.[optionKey]}</p>
            {selectedOption === optionKey &&
              (isCorrect ? <FaCheck /> : <FaTimes />)}
          </div>
        ))}
      </div>

      <div className="flex px-[37px] w-full mt-[20px]">
        {currentQuestionIndex < TotalQuestion - 1 ? (
          <div className="relative w-full mt-2 cursor-pointer">
            <div className="z-30   bg-green-Primary_2 rounded-[50px] w-full h-[50px]">
              {' '}
            </div>
            <button
              onClick={handleNextQuestion}
              className="w-full mt-[-55px] bg-green-Primary_1 text-white disabled:opacity-50 rounded-[50px]  h-[50px] flex justify-center items-center font-bold leading-[31.2px] text-[18px]"
            >
              Next
            </button>
          </div>
        ) : (
          /*   <button
            className="bg-green-Primary_1 w-full px-6 py-3 rounded-[35px] disabled:opacity-50"
            onClick={handleNextQuestion}
          >
            Next
          </button> */
          <div className="relative w-full mt-2 cursor-pointer">
            <div className="z-30   bg-green-Primary_2 rounded-[50px] w-full h-[50px]"></div>
            <button
              disabled={loading}
              onClick={handleSubmit}
              className="w-full mt-[-55px] bg-green-Primary_1 text-white disabled:opacity-50 rounded-[50px]  h-[50px] flex justify-center items-center font-bold leading-[31.2px] text-[18px]"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        )}
      </div>
      {selectedOption ? (
        <div className="px-[37px]">
          <h2 className="mt-10 underline">Solution</h2>
          <p>The correct answer is {currentQuestion?.answer}</p>
          <p
            dangerouslySetInnerHTML={{ __html: currentQuestion?.solution }}
          ></p>
        </div>
      ) : (
        ''
      )}
      {isModalVisible && (
        <div className="fixed top-0 flex right-0 left-0 items-center justify-center mx-auto  max-w-[350px]  h-full z-30">
          <div className="p-8 text-center bg-white rounded-md">
            <h2 className="mb-4 text-lg font-bold">Confirm Action</h2>
            <p className="mb-4">
              {modalType === 'end'
                ? 'Are you sure you want to end the session? You will lose your progress and  be redirected to the home page.'
                : modalType === 'reload'
                ? 'If you reload the page, you will be redirected to the home page. Do you want to proceed?'
                : 'You cannot go back to the previous page. Do you want to leave this page?'}
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 text-white bg-red-500 rounded"
                onClick={() => handleModalAction('ok')}
              >
                OK
              </button>
              <button
                className="px-4 py-2 text-black bg-gray-300 rounded"
                onClick={() => handleModalAction('cancel')}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
