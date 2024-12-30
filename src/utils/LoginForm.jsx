import { NavLink, useNavigate } from 'react-router-dom';
import FacebookSign from '../components/Icons/FacebookSign';
import Google from '../components/Icons/Google';
import { useState } from 'react';
import { PacmanLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { useLoginMutation } from '../redux/api/Auth';
import Cookies from 'js-cookie';

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const data = await login(values).unwrap();
        console.log('Login successful:', data);
        enqueueSnackbar('Login successful!', { variant: 'success' });
        Cookies.set('authToken', JSON.stringify(data), { expires: 2 });
        if (!data.isProfileComplete) {
          navigate('/profile-creation');
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Login failed:', error);
        enqueueSnackbar('invalid credentials', { variant: 'error' });

        setFieldError('username', 'Invalid username ');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col gap-5 bg-green-Primary_1 rounded-t-[40px] h-[80vh] px-8 py-8 ">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <label className="text-[#f2f2f2] font-medium text-[16px] text-start">
              Phone Number
            </label>
            <input
              name="username"
              type="username"
              id="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              className="bg-transparent border-b-[1px] focus:bg-none font-normal outline-none text-[#FFFFFF]"
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="text-red-600 text-end -mt-3 text-[12px] popins font-normal">
                {formik.errors.username}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-[#f2f2f2] font-medium text-[16px] text-start">
              Password
            </label>
            <input
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="bg-transparent border-b-[1px] outline-none font-normal text-[#FFFFFF]"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-600 text-end -mt-3 text-[12px] popins font-normal">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <div className="relative mt-2 cursor-pointer">
            <button
              type="submit"
              className="absolute  bg-white rounded-[50px] w-full h-[50px] flex justify-center items-center text-green-Primary_1 font-bold leading-[31.2px] text-[18px]"
            >
              {isLoading ? 'loading...' : 'Sign in'}
            </button>
            <div className="z-20 mt-[5px] bg-green-Primary_2 rounded-[50px] w-full h-[50px]">
              {' '}
            </div>
          </div>
        </form>
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
            <Google className=" bg-[#E1E4EB] h-[22px] w-[22px] " />
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
