import { useGetLeaderboardQuery } from '../../redux/api/Auth';
import board from '../../assets/PaceAppLogo/board.png';
import { ClipLoader } from 'react-spinners';
import { Navigate } from 'react-router-dom';

export default function Earning() {
  const { data, error, isLoading } = useGetLeaderboardQuery();
  console.log('leader', data);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }
  if (error)
    return (
      <div>
        Error:{' '}
        {error.status === 403 ? (
          <Navigate to="/auth/login" />
        ) : (
          'Please check your network'
        )}
      </div>
    );

  return (
    <div className="bg-green-Primary_1  h-[88vh] scrollbar-none new   overflow-y-scroll">
      <div className="px-[15px] py-[31px]">
        <h2 className="myFont text-[32px] text-white tracking-wider">
          Leaderboard
        </h2>
        <div className="w-full mt-3">
          {/* <div className="flex justify-center px-1 py-1 bg-white border-gray-300 rounded-xl ">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                className={`px-6 py-2  text-lg font-medium transition-all duration-300 
              ${
                activeTab === index
                  ? 'rounded-xl bg-green-Primary_1 w-full text-[#F2F2F2]'
                  : 'text-green-Primary_1  font-bold '
              }
            `}
                onClick={() => setActiveTab(index)}
              >
                {tab.title}
              </button>
            ))}
          </div> */}
        </div>
      </div>{' '}
      {/* <div className="flex justify-between w-full">
        {data?.data?.leaderboard.slice(0, 3).map((user, index) => (
          <div key="">
            <div className=" rounded-full w-[100px] ">
              <img
                src={user.image}
                alt=""
                className="object-cover rounded-full z-10 h-[100px] bg-gray-200"
              />
              <div className="mt-[-20px] ml-[10px] bg-white w-[30px] relative text-green-Primary_1 text-xl z-50 h-[30px] rounded-full items-center justify-center flex">
                {index + 1}
              </div>
              <h2 className="text-lg text-center text-white">
                {user.firstName}
              </h2>
              <h2 className="mt-3 text-lg text-center bg-white rounded-[5px] shadow-xl">
                {user.questionsAnsweredCorrectly}
              </h2>
            </div>
          </div>
        ))}
      </div> */}
      <div className="flex px-[15px] mt-7 items-center justify-between w-full gap-2">
        {data?.data?.leaderboard.slice(0, 3).map((user, index) => (
          <div
            key={index}
            className={`${
              index === 0 ? 'order-2' : index === 1 ? 'order-3' : 'order-1'
            }`}
          >
            <div
              className={`rounded-full ${
                index === 0 ? 'w-[130px] mt-[-30px]' : 'w-[100px]'
              }`}
            >
              <img
                src={user.image}
                alt=""
                className={`object-cover rounded-full z-10 h-[100px] bg-gray-200 ${
                  index === 0 ? 'h-[130px] ' : 'h-[100px]'
                }`}
              />
              <div className="mt-[-20px] ml-[10px] bg-white w-[30px] relative text-green-Primary_1 text-xl z-50 h-[30px] rounded-full items-center justify-center flex">
                {index + 1}
              </div>
              <h2 className="text-lg text-center text-white">
                {user.firstName}
              </h2>
              <h2 className="mt-3 text-lg text-center bg-white rounded-[5px] shadow-xl">
                {user.questionsAnsweredCorrectly}
              </h2>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center w-full gap-5 mt-3">
        {data?.data?.leaderboard.slice(3).map((user, index) => (
          <div className="flex items-center w-full gap-2">
            <h2 className="text-white">{index + 1}</h2>
            <div
              key=""
              className="flex justify-between w-full  items-center bg-white rounded-[5px]"
            >
              <div className="flex items-center gap-2  px-[21px] w-full h-[40px] ">
                <img
                  src={user.image}
                  alt=""
                  className="object-cover rounded-full z-10 w-[30px] h-[30px] bg-gray-200"
                />
                <h2 className="text-lg text-center ">{user.firstName}</h2>
              </div>
              <div>
                <h2 className="px-3 text-lg  rounded-[5px] shadow-xl">
                  {user.questionsAnsweredCorrectly}
                </h2>{' '}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
