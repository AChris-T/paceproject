import Cookies from 'js-cookie';
import { CiCalendarDate, CiClock2 } from 'react-icons/ci';
import question from '../../assets/PaceAppLogo/Grou.png';
import PrcaticeIcon from '../../components/Icons/PrcaticeIcon';
import TimerIcon from '../../components/Icons/TimerIcon';
import ReferIcon from '../../components/Icons/ReferIcon';
import { useGetDashboardProfileQuery } from '../../redux/api/Auth';
import { Navigate, useNavigate } from 'react-router-dom';
import board from '../../assets/PaceAppLogo/board.png';
import { ClipLoader } from 'react-spinners';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Modal,
  Typography,
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '0px solid #fff',
  boxShadow: 24,
  p: 4,
};

export default function Home() {
  const { data, error, isLoading } = useGetDashboardProfileQuery();
  console.log(data?.data);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedSubject, setSelectedSubject] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if navigation should happen after reload
    if (localStorage.getItem('navigateAfterReload') === 'true') {
      localStorage.removeItem('navigateAfterReload'); // Clean up
      navigate('/question', { replace: true }); // Navigate to question page
    }
  }, [navigate]);

  const handleNext = () => {
    if (!selectedSubject) {
      console.warn('No subject selected');
      return;
    }

    localStorage.setItem('subjectSelected', selectedSubject);
    localStorage.setItem('navigateAfterReload', 'true'); // Set flag for navigation
    window.location.reload(); // Reload page first
  };

  const handleSelect = (subject) => {
    setSelectedSubject(subject); // Allow only one subject to be selected at a time
  };

  /*  const handleNext = () => {
    window.location.reload(); // Refresh only after saving progress
    if (selectedSubject) {
      localStorage.setItem('subjectSelected', selectedSubject);
      navigate('/question', { replace: true }); // Navigates without reloading
    } else {
      console.log('No subject selected');
    }
  };
 */
  /*  const handleNext = () => {
    if (selectedSubject) {
      localStorage.setItem('subjectSelected', selectedSubject);
      navigate('/question', { replace: true });
    } else {
      console.warn('No subject selected');
    }

    setShouldReload(true); // Trigger reload
  };

  useEffect(() => {
    if (shouldReload) {
      window.location.reload();
    }
  }, [shouldReload]); */

  if (isLoading)
    return (
      <div className="bg-green-Primary_1 h-[100vh] flex-col flex justify-center items-center">
        <img src={board} alt="" />
        <h2 className="font-bold text-white text-[24px] mt-5 tracking-wide ">
          The PaceApp
        </h2>
        <ClipLoader className="text-white" />
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
  return (
    <div className="px-[17px] py-[43px] flex flex-col h-[88vh] scrollbar-none new   overflow-y-scroll">
      <h3 className="text-[36px] capitalize text-[#16956C] myFont">
        Hi, {data?.data?.username}
      </h3>
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
      <div
        onClick={handleOpen}
        className="bg-[#167E95] cursor-pointer flex gap-5 items-center md:py-[16px] py-[22px] tracking-wide  text-white mt-[15px] rounded-[10px] px-[29px]  newbgn"
      >
        <PrcaticeIcon />
        <h2>PRATICE NOW</h2>
      </div>
      <div className="bg-white border-[#E1E4EB] border-[1px] flex gap-5 items-center md:py-[16px] py-[22px] tracking-wide   mt-[15px] rounded-[10px] px-[29px]  ">
        <ReferIcon />
        <h2 className="text-[#167E95]">Refer your friends</h2>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="flex flex-col">
          <h3 className="mb-5">Select the subject you want to pracice</h3>

          {data?.data?.subjectsOfInterest.map((subject) => (
            <FormControlLabel
              key={subject}
              control={
                <Checkbox
                  checked={selectedSubject === subject}
                  onChange={() => handleSelect(subject)}
                />
              }
              label={subject}
            />
          ))}
          {selectedSubject ? (
            <button
              className="py-2 text-white rounded-lg mt-9 bg-green-Primary_1"
              onClick={handleNext}
              disabled={!selectedSubject} // Disable the button until a subject is selected
            >
              Next
            </button>
          ) : (
            ''
          )}
        </Box>
      </Modal>
    </div>
  );
}
