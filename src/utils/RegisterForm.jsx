import { NavLink, useNavigate } from 'react-router-dom';
import FacebookSign from '../components/Icons/FacebookSign';
import Google from '../components/Icons/Google';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { PacmanLoader } from 'react-spinners';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import { useRegisterUserMutation } from '../redux/api/Auth';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';

const Register = () => {
  const [register, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      username: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .max(20, 'Username must not exceed 20 characters')
        .required('Username is required'),

      phoneNumber: Yup.string().required('Phone number is required'),

      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password must not exceed 20 characters')
        .required('Password is required'),

      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const data = await register(values).unwrap();
        console.log('Login successful:', data);
        Cookies.set('authToken', JSON.stringify(data), { expires: 2 }); // `expires: 2` means 2 hours
        navigate('/profile-creation');
        enqueueSnackbar('Creation of User successful!', { variant: 'success' });
      } catch (error) {
        console.error('Login failed:', error.data);
        enqueueSnackbar(error.data.message, { variant: 'error' });
        setFieldError('email', error.data.email);
        setFieldError('password', error.data.password);
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <div className="flex flex-col gap-8 bg-green-Primary_1 rounded-t-[40px] h-[80vh] md:h-full px-8 py-8 ">
      <ToastContainer />
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <label className="text-[#f2f2f2] text-start font-medium text-[16px]">
            Username
          </label>
          <input
            name="username"
            type="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            className="bg-transparent
          border-b-[1px] font-normal outline-none
         text-[#FFFFFF]"
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="text-red-600 text-end -mt-3 text-[14px] popins font-normal">
              {formik.errors.username}
            </div>
          ) : null}
        </div>
        <div className="flex flex-col gap-3">
          <label
            className="text-[#f2f2f2] 
      text-start  font-medium
      text-[16px]"
          >
            Phone number
          </label>
          <input
            name="phoneNumber"
            type="phoneNumber"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phoneNumber}
            className="bg-transparent 
        border-b-[1px] font-normal outline-none 
        text-[#FFFFFF]"
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <div className="text-red-600 text-end -mt-3 text-[14px] popins font-normal">
              {formik.errors.phoneNumber}
            </div>
          ) : null}
        </div>
        <div className="flex flex-col gap-3">
          <label
            className="text-[#f2f2f2] 
          text-start font-medium          text-[16px]"
          >
            Password
          </label>

          <input
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="bg-transparent
         border-b-[1px] outline-none 
         font-normal text-[#FFFFFF]"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-600 text-end -mt-3 text-[14px] popins font-normal">
              {formik.errors.password}
            </div>
          ) : null}
        </div>
        <div className="flex flex-col gap-3">
          <label
            className="text-[#f2f2f2]
         text-start font-medium
          text-[16px]"
          >
            Confirm Password
          </label>
          <input
            name="confirmPassword"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            className="bg-transparent
         border-b-[1px] outline-none 
         font-normal text-[#FFFFFF]"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="text-red-600 text-end -mt-3 text-[14px] popins font-normal">
              {formik.errors.confirmPassword}
            </div>
          ) : null}
        </div>
        <div className="relative mt-2 cursor-pointer">
          <button
            type="submit"
            className="absolute  bg-white
              rounded-[50px] w-full h-[50px] 
              flex justify-center items-center
              text-green-Primary_1 font-bold
               leading-[31.2px] text-[18px]"
          >
            {isLoading ? 'loading' : 'Sign up'}
          </button>
          <div className="z-20 mt-[5px] bg-green-Primary_2 rounded-[50px] w-full h-[50px]">
            {' '}
          </div>
        </div>
        <NavLink
          to="/Forget-password"
          className="flex justify-center items-center w-full font-semibold text-[#f9f9f9] text-[14px] italic"
        >
          Forget password?
        </NavLink>
        <div className="flex flex-row items-center justify-around gap-2">
          <div className="bg-[#E1E4EB] w-full h-[1px] rounded-sm"></div>
          <div className="text-[#fff] text-[16px] italic font-normal ">Or</div>
          <div className="bg-[#E1E4EB] w-full h-[1px] rounded-sm"></div>
        </div>
        <div className="flex justify-between gap-5">
          <button className="flex justify-around items-center bg-[#FFFFFF] px-3 rounded-[10px] h-[38px] w-full py-6">
            <h6 className="italic text-[15px] font-bold text-[#16956C] flex items-center justify-center w-full">
              sign up with
            </h6>
            <FacebookSign />
          </button>
          <button className="flex justify-around items-center bg-[#fff] px-3  rounded-[10px] h-[38px] w-full py-6">
            <h6 className="italic text-[15px] font-bold text-[#16956C] flex items-center justify-center w-full">
              sign up with
            </h6>
            <Google className=" h-[22px] w-[22px] " />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
