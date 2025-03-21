import { NavLink, useNavigate } from 'react-router-dom';
import { useForgetPasswordMutation } from '../redux/api/Auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import { enqueueSnackbar } from 'notistack';
import Cookies from 'js-cookie';

const ForgetPassword = () => {
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'Username/phone number must be at least 3 characters')
        .max(20, 'Username/phone number must not exceed 20 characters')
        .required('Username/phone number is required'),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const data = await forgetPassword(values).unwrap();
        console.log('Login successful:', data.message);
        localStorage.setItem('OTP', data.data);
        Cookies.set('authToken', JSON.stringify(data), { expires: 2 }); // `expires: 2` means 2 hours
        navigate('/reset_password');
        enqueueSnackbar(data.message, { variant: 'success' });
      } catch (error) {
        setFieldError('username', error.data.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="max-w-[740px] mx-auto shadow-card overflow-x-hidden ">
      <div className="px-8 py-8">
        <h3 className="text-[32px] font-semibold text-[#16956C] mb-10">
          Forget password
        </h3>
      </div>
      <div className="flex flex-col gap-8 bg-green-Primary_1 rounded-t-[40px] h-[85vh] px-8 py-8 ">
        <div className="flex flex-col gap-3">
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <label className="text-[#f2f2f2] font-medium text-[16px] text-start">
                Phone Number / Username
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
                <div className="text-[#ff0000] text-end -mt-2 text-[12px] popins font-normal">
                  {formik.errors.username}
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
                {isLoading ? 'Wait' : 'Reset Password'}
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
