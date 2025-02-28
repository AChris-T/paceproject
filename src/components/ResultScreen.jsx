/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { useNavigate } from 'react-router-dom';

function getAssessmentMessage(score, total = 10) {
  console.log('This is the score', score);
  const percentage = (score / total) * 100;

  if (percentage >= 90) {
    return { header: 'Brilliant!', message: 'You did exceptionally well!' };
  } else if (percentage >= 75) {
    return { header: 'Great Job!', message: "You're on the right track!" };
  } else if (percentage >= 50) {
    return { header: 'Good Effort!', message: 'Keep practicing to improve!' };
  } else if (percentage >= 30) {
    return { header: 'Keep Going!', message: 'Review and try again!' };
  } else {
    return {
      header: 'Needs Improvement!',
      message: "Don't give up, practice makes perfect!",
    };
  }
}

export const ResultScreen = ({
  score = localStorage.getItem('correctAnswers'),
  totalQuestions = localStorage.getItem('totalQuestion'),
  coinsEarned = localStorage.getItem('correctAnswers'),
}) => {
  const navigate = useNavigate();
  const review = getAssessmentMessage(score);

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-green-Primary_1">
      {/* Title */}
      <div className="self-start mb-8 text-left">
        <h1 className="mb-2 text-3xl font-bold text-white">
          {review.header || 'Result'}
        </h1>
        <p className="text-lg font-semibold text-white/90">
          {review.message || 'Keep Practicing'}
        </p>
      </div>

      {/* Score Display */}
      <div className="relative w-full max-w-[280px] aspect-square mb-8">
        <div className="absolute inset-0 rounded-full bg-white/10"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          {/* Lightning Bolt with Score */}
          <img
            src="/thunder.svg"
            alt="thunder image"
            className="absolute top-0 left-0 w-full h-full"
          />
          <div
            className="relative flex justify-center w-full h-full p-8 "
            // style={{
            //   clipPath:
            //     'polygon(67% 0, 65% 36%, 88% 36%, 39% 100%, 44% 54%, 17% 55%)',
            //   // 'polygon(67% 0, 66% 29%, 100% 27%, 39% 100%, 44% 54%, 8% 54%)',
            // }}
          >
            <div className="transform scale-90">
              <div className="mt-16 text-center text-green-Primary_1">
                <span className="text-4xl font-bold">{score}</span>
                <span className="text-xl font-medium">/{totalQuestions}</span>
              </div>
              <p className="mt-1 text-sm font-bold text-green-Primary_1">
                Correct Answers
              </p>
            </div>
            {/* Stars */}
            <div className="absolute left-10 top-4 animate-pin">
              {/* <svg
                className="w-6 h-6 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg> */}
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 0L16.5112 9.48882L26 13L16.5112 16.5112L13 26L9.48882 16.5112L0 13L9.48882 9.48882L13 0Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="absolute left-14 top-14 animate-bounce">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 0L9.52568 5.47432L15 7.5L9.52568 9.52568L7.5 15L5.47432 9.52568L0 7.5L5.47432 5.47432L7.5 0Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="absolute left-16 top-8">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 0L11.4308 6.56918L18 9L11.4308 11.4308L9 18L6.56918 11.4308L0 9L6.56918 6.56918L9 0Z"
                  fill="white"
                />
              </svg>
            </div>
            {/* Stars */}
            <div className="absolute right-10 bottom-4">
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 0L16.5112 9.48882L26 13L16.5112 16.5112L13 26L9.48882 16.5112L0 13L9.48882 9.48882L13 0Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="absolute right-14 bottom-14 animate-pulse">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 0L9.52568 5.47432L15 7.5L9.52568 9.52568L7.5 15L5.47432 9.52568L0 7.5L5.47432 5.47432L7.5 0Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="absolute right-16 bottom-8">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 0L11.4308 6.56918L18 9L11.4308 11.4308L9 18L6.56918 11.4308L0 9L6.56918 6.56918L9 0Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Coins Earned */}
      <div className="bg-white/10 rounded-xl p-4 mb-8 w-full max-w-[300px] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg
            className="w-6 h-6 text-white"
            viewBox="0 0 24 24"
            fill="#30E0A8"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
          <span className="text-sm font-semibold text-white">Coin Earned</span>
        </div>
        <span className="text-xl font-bold text-white">{coinsEarned}</span>
      </div>

      {/* Play Again Button */}
      <div className="w-full max-w-[300px] relative">
        <div className="absolute bg-[#1AB381] w-full z-[1] bottom-[-3px] shadow-sm h-[50px] rounded-full"></div>
        <button
          onClick={() => navigate('/app/home')}
          className="relative z-[10] w-full bg-white text-green-Primary_1 py-4 rounded-full font-bold"
        >
          PLAY AGAIN
        </button>
      </div>
    </div>
  );
};
