import React, { useState } from 'react';
import Earning from './Earning';

export default function LeaderBoard() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { id: 0, title: 'Earnings', content: <Earning /> },
    /*     { id: 1, title: 'Coins', content: 'Weekly top players' },
     */
  ];

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
      </div>
      <div className="px-[15px] mt-7 ">
        {tabs[activeTab] ? (
          <p className="text-gray-700">{tabs[activeTab].content}</p>
        ) : (
          <p className="text-red-500">Error: No content available.</p>
        )}
      </div>
    </div>
  );
}
