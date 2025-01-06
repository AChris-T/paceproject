import { useFormik } from 'formik';
import React, { useState } from 'react';
import {
  FaBook,
  FaCalculator,
  FaGlobe,
  FaFlask,
  FaLeaf,
  FaAtom,
  FaMoneyBillWave,
  FaGavel,
  FaTheaterMasks,
  FaTractor,
  FaMapMarkedAlt,
  FaCashRegister,
  FaBible,
  FaSquareRootAlt,
  FaHistory,
  FaDesktop,
  FaCheckCircle,
} from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { saveSubjects } from '../../redux/FormSlice';
import { useNavigate } from 'react-router-dom';

export default function Subject({ onBack, handleSubmit, onNext }) {
  const dispatch = useDispatch();
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const subjects = [
    { name: 'Mathematics', icon: FaCalculator },
    { name: 'English-Language', icon: FaBook },
    { name: 'Physics', icon: FaAtom },
    { name: 'Chemistry', icon: FaFlask },
    { name: 'Biology', icon: FaLeaf },
    { name: 'Economics', icon: FaMoneyBillWave },
    { name: 'Government', icon: FaGavel },
    { name: 'Literature-in-English', icon: FaTheaterMasks },
    { name: 'Agricultural-Science', icon: FaTractor },
    { name: 'Geography', icon: FaMapMarkedAlt },
    { name: 'Commerce', icon: FaCashRegister },
    { name: 'Financial-Accounting', icon: FaMoneyBillWave },
    { name: 'CRK/IRK', icon: FaBible },
    { name: 'Further-Mathematics', icon: FaSquareRootAlt },
    { name: 'History', icon: FaHistory },
    { name: 'Computer-Studies', icon: FaDesktop },
    // Add more subjects as needed
  ];

  const handleSelect = (subjectsOfInterest) => {
    // Toggle selection of subjects
    const updatedSubjects = selectedSubjects.includes(subjectsOfInterest.name)
      ? selectedSubjects.filter((s) => s !== subjectsOfInterest.name)
      : [...selectedSubjects, subjectsOfInterest.name];

    // Update the selected subjects state
    setSelectedSubjects(updatedSubjects);
    formik.setFieldValue('subjectsOfInterest', updatedSubjects); // Update Formik field value

    // If more than 4 subjects are selected, show error
    if (updatedSubjects.length > 4) {
      setError('You can only select up to 4 subjects.');
    } else {
      setError('');
    }
  };

  const formik = useFormik({
    initialValues: { subjectsOfInterest: '' },
    validate: (values) => {
      const errors = {};
      if (values.subjectsOfInterest.length === 0)
        errors.subjectsOfInterest =
          'At least one subjectsOfInterest must be selected.';
      return errors;
    },
    onSubmit: (values) => {
      if (values.subjectsOfInterest.length > 0) {
        dispatch(
          saveSubjects({ subjectsOfInterest: values.subjectsOfInterest })
        );
        handleSubmit();
      } else {
        setError('You must select at least one subjectsOfInterest.');
      }
    },
  });

  return (
    <div className="max-w-[740px] h-full mx-auto border-[1px] shadow-card overflow-hidden ">
      <div className=" px-[37px] py-[31px]">
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="text-[32px] lg:w-full w-[242px] leading-10 text-green-Primary_1 myFont">
              Choose your interest{' '}
            </h3>
            <h3 className="font-semibold">3/3</h3>
          </div>
          <h3 className="font-normal text-[#4B4D52]">Choose one Department</h3>
        </div>
        <form onSubmit={formik.handleSubmit} className="space-y-4 mt-[24px]">
          <div className="grid grid-cols-2 gap-2 ">
            {subjects.map((subjectsOfInterest) => {
              const Icon = subjectsOfInterest.icon;
              return (
                <label
                  key={subjectsOfInterest.name}
                  onClick={() => handleSelect(subjectsOfInterest)}
                  className={`flex items-center justify-between w-30 p-4 border rounded-lg cursor-pointer transition ${
                    selectedSubjects.includes(subjectsOfInterest.name)
                      ? 'border-green-Primary_1 bg-green-Primary_1 text-white'
                      : 'border-gray-300 bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {selectedSubjects.includes(subjectsOfInterest.name) ? (
                      <FaCheckCircle className="text-white" size={20} />
                    ) : (
                      <Icon className="text-gray-500" size={20} />
                    )}
                    <span
                      className={`font-medium ${
                        selectedSubjects.includes(subjectsOfInterest.name)
                          ? 'text-white'
                          : 'text-gray-700'
                      }`}
                    >
                      {subjectsOfInterest.name}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>

          {error && <div className="text-red-500">{error}</div>}
          {formik.errors.subjectsOfInterest && (
            <div className="text-red-500">
              {formik.errors.subjectsOfInterest}
            </div>
          )}

          <div className="mt-10 cursor-pointer mb-14">
            <button
              type="submit"
              className="bg-green-Primary_1 rounded-[50px] w-full h-[50px]  flex justify-center items-center text-white font-bold leading-[31.2px] text-[18px]"
            >
              Next{' '}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
