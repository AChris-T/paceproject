import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { saveDepartment } from '../../redux/FormSlice';
import { useState } from 'react';
import ArtIcon from '../Icons/ArtIcon';
import ScienceIcon from '../Icons/ScienceIcon';
import CommericalIcon from '../Icons/CommericalIcon';

const departments = [
  {
    name: 'Arts',
    icon: <ArtIcon />,
    gradient: 'bg-gradient-to-r from-[#FD277C] to-[#FF7455]',
  },
  {
    name: 'Sciences',
    icon: <ScienceIcon />,
    gradient: 'bg-gradient-to-r from-[#DB9224] to-[#EDE527]',
  },
  {
    name: 'Commercials',
    icon: <CommericalIcon />,
    gradient: 'bg-gradient-to-r from-[#7C48C3] to-[#B16CDC]',
  },
];

export default function Department({ onNext, onBack }) {
  const dispatch = useDispatch();
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const formik = useFormik({
    initialValues: { department: '' },
    validate: (values) => {
      const errors = {};
      if (!values.department) errors.department = 'Please select a department';
      return errors;
    },
    onSubmit: (values) => {
      dispatch(saveDepartment(values));
      onNext();
    },
  });

  const handleSelect = (dept) => {
    formik.setFieldValue('department', dept.name);
    setSelectedDepartment(dept.name);
  };

  return (
    <div className="max-w-[500px]  mx-auto  border-[1px] shadow-card overflow-hidden ">
      <div className=" px-[37px] py-[31px]">
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="text-[32px] text-green-Primary_1 myFont">
              Choose Department
            </h3>
            <h3 className="font-semibold">2/3</h3>
          </div>
          <h3 className="font-normal text-[#4B4D52]">Choose one Department</h3>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col  gap-[35px] w-full mt-[25px] justify-center"
        >
          {departments.map((dept) => (
            <div
              className={`flex flex-row-reverse items-center justify-between w-full p-2  border rounded-lg cursor-pointer transition ${
                selectedDepartment === dept.name
                  ? `border-[#16956C] border-2 `
                  : ``
              }`}
            >
              <label
                key={dept.name}
                onClick={() => handleSelect(dept)}
                className={`flex flex-row-reverse items-center justify-between w-full px-[37px] py-[28px] border rounded-lg cursor-pointer transition ${
                  selectedDepartment === dept.name
                    ? `border-red-500  ${dept.gradient} `
                    : `${dept.gradient}`
                }`}
              >
                <span className="text-2xl">{dept.icon}</span>
                <span className="font-bold text-[24px] text-white ">
                  {dept.name}
                </span>
                {selectedDepartment !== dept.name && (
                  <input
                    type="radio"
                    name="department"
                    value={dept.name}
                    className="hidden"
                    checked={formik.values.department === dept.name}
                    readOnly
                  />
                )}
              </label>
            </div>
          ))}
          {formik.errors.department && (
            <div style={{ color: 'red' }}>{formik.errors.department}</div>
          )}

          <div className="relative my-10 cursor-pointer">
            <button
              type="submit"
              className="absolute  bg-green-Primary_1 rounded-[50px] w-full h-[50px]  flex justify-center items-center text-white font-bold leading-[31.2px] text-[18px]"
            >
              Next{' '}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
