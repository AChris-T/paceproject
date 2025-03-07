import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import FacebookSign from '../components/Icons/FacebookSign';
import Google from '../components/Icons/Google';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { useLoginMutation } from '../redux/api/Auth';
import Cookies from 'js-cookie';

const Login = ({ setAllowProfileCreation }) => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const data = await login(values).unwrap();
        enqueueSnackbar('Login successful!', { variant: 'success' });
        Cookies.set('User', JSON.stringify(data), { expires: 2 });
        Cookies.set('UserDetails', data.data, { expires: 2 });
        Cookies.set('authToken', data.data.token, { expires: 2 });

        if (!data?.data?.isProfileComplete) {
          navigate('/profile-creation');
          setAllowProfileCreation(true);
        } else {
          navigate('/app/home');
        }
      } catch (error) {
        enqueueSnackbar('Invalid credentials', { variant: 'error' });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex flex-col gap-5 bg-green-Primary_1 rounded-t-[40px] h-[80vh] px-8 py-8">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <label className="text-[#f2f2f2] font-medium text-[16px]">
            Phone Number / Username
          </label>
          <input
            name="username"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            className="bg-transparent border-b-[1px] outline-none text-[#FFFFFF]"
          />
          {formik.touched.username && formik.errors.username && (
            <div className="text-[#FF0000] text-end text-[12px]">
              {formik.errors.username}
            </div>
          )}
        </div>

        <div className="relative flex flex-col gap-3">
          <label className="text-[#f2f2f2] font-medium text-[16px]">
            Password
          </label>
          <div className="relative w-full">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="bg-transparent border-b-[1px] outline-none text-[#FFFFFF] w-full pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute text-white transform -translate-y-1/2 right-2 top-1/2"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-600 text-end text-[12px]">
              {formik.errors.password}
            </div>
          )}
        </div>

        <div className="relative mt-2 cursor-pointer">
          <button
            type="submit"
            className="absolute bg-white rounded-[50px] w-full h-[50px] flex justify-center items-center text-green-Primary_1 font-bold text-[18px]"
          >
            {isLoading ? 'Loading...' : 'Sign in'}
          </button>
          <div className="z-20 mt-[5px] bg-green-Primary_2 rounded-[50px] w-full h-[50px]"></div>
        </div>
      </form>

      <NavLink
        to="/Forget-password"
        className="flex justify-center items-center w-full font-semibold text-[#f9f9f9] text-[14px] italic"
      >
        Forgot password?
      </NavLink>

      <div className="flex flex-row items-center justify-around gap-2">
        <div className="bg-[#E1E4EB] w-full h-[1px]"></div>
        <div className="text-[#fff] text-[16px] italic">Or</div>
        <div className="bg-[#E1E4EB] w-full h-[1px]"></div>
      </div>

      <div className="flex justify-between gap-5">
        <button className="flex justify-around items-center bg-[#FFFFFF] px-3 rounded-[10px] h-[38px] w-full py-6">
          <h6 className="italic text-[15px] font-bold text-[#16956C]">
            Sign up with
          </h6>
          <FacebookSign />
        </button>
        <button className="flex justify-around items-center bg-[#fff] px-3 rounded-[10px] h-[38px] w-full py-6">
          <h6 className="italic text-[15px] font-bold text-[#16956C]">
            Sign up with
          </h6>
          <Google className=" bg-[#E1E4EB] h-[22px] w-[22px]" />
        </button>
      </div>
    </div>
  );
};

export default Login;
