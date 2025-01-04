import Cookies from 'js-cookie';
import { CiCalendarDate, CiClock2 } from 'react-icons/ci';
import question from '../../assets/PaceAppLogo/Grou.png';
import PrcaticeIcon from '../../components/Icons/PrcaticeIcon';
import TimerIcon from '../../components/Icons/TimerIcon';
import ReferIcon from '../../components/Icons/ReferIcon';

export default function Home() {
  const userDetails = Cookies.get('User');
  const parsedUserDetails = JSON.parse(userDetails); // Parse the JSON string
  const firstName = parsedUserDetails?.data?.username;
  console.log(firstName);
  return (
    <div className="px-[17px] py-[43px] flex flex-col h-[88vh] scrollbar-none new   overflow-y-scroll">
      <h3 className="text-[36px] text-[#16956C] myFont">Hi,{firstName}</h3>
      <h3 className="text-[20px]  font-medium text-[#4B4D52]">
        Next Live Quiz
      </h3>
      <div className="bg-green-Primary_1 tracking-wide   text-white mt-[15px] rounded-[20px] px-[29px]  newbg">
        <div className="flex flex-col gap-[18px]">
          <h3 className="font-bold text-[24px] mt-5 tracking-wide ">
            SATURDAY LIVE QUIZ
          </h3>
          <h3 className="font-medium">Entry: Coming soon</h3>
          <div className="flex items-center gap-[9px]">
            <CiCalendarDate className="bg-green-Primary_2 w-[25px] h-[25px] p-1 rounded-full" />
            <h3 className="text-sm">Coming Soon</h3>
          </div>
          <div className="flex items-center gap-[9px]">
            <CiClock2 className="bg-green-Primary_2 w-[25px] h-[25px] p-1 rounded-full" />
            <h3 className="text-sm">Coming Soon</h3>
          </div>
          <div className="flex items-center gap-[9px] justify-between mb-[31px]">
            <p className="border-[#47D1A5] border-[1px] text-[#F9F9F9] text-[18px] w-[129px] h-[35px] px-4 gap-2 items-center flex rounded-full">
              <TimerIcon />
              --:--:--
            </p>
            <img src={question} alt="" className="text-sm" />
          </div>
        </div>
      </div>
      <div className="bg-[#167E95] flex gap-5 items-center md:py-[16px] h-[60px] tracking-wide  text-white mt-[15px] rounded-[10px] px-[29px]  newbgn">
        <PrcaticeIcon />
        <h2>PRATICE NOW</h2>
      </div>
      <div className="bg-white border-[#E1E4EB] border-[1px] flex gap-5 items-center md:py-[16px] h-[60px] tracking-wide   mt-[15px] rounded-[10px] px-[29px]  ">
        <ReferIcon />
        <h2 className="text-[#167E95]">Refer your friends</h2>
      </div>
    </div>
  );
}
