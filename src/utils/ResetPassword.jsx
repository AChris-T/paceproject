import { NavLink, useNavigate } from 'react-router-dom';
import { useResetPasswordMutation } from '../redux/api/Auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import { enqueueSnackbar } from 'notistack';
import Cookies from 'js-cookie';

const ForgetPassword = () => {
  const [forgetPassword, { isLoading }] = useResetPasswordMutation();
  const navigate = useNavigate();
  const OTP = localStorage.getItem('OTP');
  const formik = useFormik({
    initialValues: {
      username: '',
      newPassord: '',
      confirmPassord: '',
      OTP: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .max(20, 'Username must not exceed 20 characters')
        .required('Username is required'),

      newPassword: Yup.string()
        .required('New password is required.')
        .min(8, 'Password must be at least 8 characters.')
        .matches(
          /[A-Z]/,
          'Password must contain at least one uppercase letter.'
        )
        .matches(
          /[a-z]/,
          'Password must contain at least one lowercase letter.'
        )
        .matches(/[0-9]/, 'Password must contain at least one digit.'),
      confirmPassword: Yup.string()
        .required('Confirm password is required.')
        .oneOf([Yup.ref('newPassword')], 'Passwords do not match.'),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const data = await forgetPassword(values).unwrap();
        console.log('Login successful:', data.message);
        Cookies.set('authToken', JSON.stringify(data), { expires: 2 }); // `expires: 2` means 2 hours
        navigate('/reset_password');
        enqueueSnackbar(data.message, { variant: 'success' });
      } catch (error) {
        setFieldError('username', error.data.message);
        setFieldError('confirmPassword', error.data.message);
        setFieldError('newPassword', error.data.message);
        setFieldError('OTP', error.data.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="max-w-[740px] mx-auto shadow-card overflow-x-hidden ">
      <div className="px-8 py-8">
        <h3 className="text-[32px] font-semibold text-[#16956C] mb-10">
          Reset password
        </h3>
      </div>
      <div className="flex flex-col gap-8 bg-green-Primary_1 rounded-t-[40px] h-[85vh] px-8 py-8 ">
        <div className="flex flex-col gap-3">
          <h2>Your OTP: {OTP}</h2>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <label className="text-[#f2f2f2] font-medium text-[16px] text-start">
                Username
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
                OTP
              </label>
              <input
                name="OTP"
                type="text"
                id="OTP"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.OTP}
                className="bg-transparent border-b-[1px] focus:bg-none font-normal outline-none text-[#FFFFFF]"
              />
              {formik.touched.OTP && formik.errors.OTP ? (
                <div className="text-red-600 text-end -mt-3 text-[12px] popins font-normal">
                  {formik.errors.OTP}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[#f2f2f2] font-medium text-[16px] text-start">
                New Password
              </label>
              <input
                name="newPassword"
                type="newPassword"
                id="newPassord"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newPassword}
                className="bg-transparent border-b-[1px] focus:bg-none font-normal outline-none text-[#FFFFFF]"
              />
              {formik.touched.newPassword && formik.errors.newPassword ? (
                <div className="text-red-600 text-end -mt-3 text-[12px] popins font-normal">
                  {formik.errors.newPassword}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[#f2f2f2] font-medium text-[16px] text-start">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type="confirmPassword"
                id="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                className="bg-transparent border-b-[1px] focus:bg-none font-normal outline-none text-[#FFFFFF]"
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="text-red-600 text-end -mt-3 text-[12px] popins font-normal">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>
            <NavLink
              to="/register"
              className="flex justify-center items-center w-full font-semibold text-[#f9f9f9] text-[12px] italic"
            >
              or Create new account
            </NavLink>
            <div className="relative mt-2 cursor-pointer">
              <button
                type="submit"
                className="absolute  bg-white rounded-[50px] w-full h-[50px] flex justify-center items-center text-green-Primary_1 font-bold leading-[31.2px] text-[18px]"
              >
                {isLoading ? 'Reseting Password' : 'Reset Password'}
              </button>
              <div className="z-20 mt-[5px] bg-green-Primary_2 rounded-[50px] w-full h-[50px]">
                {' '}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
