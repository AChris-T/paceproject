import React from 'react';
import { IoIosNotifications } from 'react-icons/io';

export default function Notification() {
  return (
    <div className="px-[35px] py-[37px]  h-[90vh]">
      <h3 className="text-[32px] text-[#16956C] myFont">Notication</h3>
      <div className="flex flex-col items-center justify-center h-full ">
        <div className="bg-green-Primary_1 w-[180px] h-[180px] rounded-full flex items-center justify-center">
          <IoIosNotifications className="text-white w-[100px] h-[100px]" />
        </div>
        <h3 className=" mt-[27px] w-[218px] text-center">
          You don't have any Notification yet.
        </h3>
      </div>
    </div>
  );
}
