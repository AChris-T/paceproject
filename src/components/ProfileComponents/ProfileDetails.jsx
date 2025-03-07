import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { savePersonalDetails } from '../../redux/FormSlice';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import user from '../../assets/PaceAppLogo/userd.jpg';
import API_BASE_URL from '../../constants/Api';
import { FaMinus } from 'react-icons/fa';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

export default function ProfileDetails({ onNext }) {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null); // To store image URL
  const [imagePreview, setImagePreview] = useState(null); // To store image preview
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      personalDetails: {
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        dateOfBirth: '',
        levelOfStudy: '',
        image: '',
      },
    },
    validate: (values) => {
      const errors = {};

      // Validate firstName
      if (!values.personalDetails.firstName.trimStart()) {
        errors.firstName = 'First name is required';
      } else if (values.personalDetails.firstName.length < 2) {
        errors.firstName = 'First name must be at least 2 characters';
      } else if (!/^[A-Za-z]+$/.test(values.personalDetails.firstName.trim())) {
        errors.firstName = 'First name must only contain letters';
      }

      // Validate lastName
      if (!values.personalDetails.lastName) {
        errors.lastName = 'Last name is required';
      } else if (values.personalDetails.lastName.length < 2) {
        errors.lastName = 'Last name must be at least 2 characters';
      } else if (!/^[A-Za-z]+$/.test(values.personalDetails.lastName.trim())) {
        errors.lastName = 'Last name must only contain letters';
      }

      // Validate email
      /*   if (!values.personalDetails.email) {
        errors.email = 'Email is required';
      } else if (
        !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
          values.personalDetails.email
        )
      ) {
        errors.email = 'Invalid email address';
      } */

      // Validate gender
      if (!values.personalDetails.gender) {
        errors.gender = 'Gender is required';
      } else if (
        !['Male', 'Female'].includes(values.personalDetails.gender.trim())
      ) {
        errors.gender = 'Invalid gender selection';
      }

      // Validate dateOfBirth
      if (!values.personalDetails.dateOfBirth) {
        errors.dateOfBirth = 'Date of birth is required';
      } else {
        const today = new Date();
        const birthDate = new Date(values.personalDetails.dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (
          monthDifference < 0 ||
          (monthDifference === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }
        if (age < 13) {
          errors.dateOfBirth = 'You must be at least 13 years old';
        }
      }

      // Validate levelOfStudy
      if (
        !values.personalDetails.levelOfStudy ||
        values.personalDetails.levelOfStudy === ''
      ) {
        errors.levelOfStudy = 'Level of Study is required';
      }

      // Validate image
      if (!values.personalDetails.image) {
        errors.image = 'Profile image is required';
      }

      return errors;
    },
    onSubmit: (values) => {
      dispatch(savePersonalDetails(values.personalDetails)); // Pass the personalDetails object to the Redux action
      onNext();
      console.log(values.personalDetails);
    },
  });

  // Handle image upload
  const handleImageUpload = async (img) => {
    if (img && img[0]) {
      const file = img[0];
      setImage(file); // Set the image object for preview
      const formData = new FormData();
      formData.append('file', file); // Append the file to form data

      try {
        const token = Cookies.get('authToken');
        if (!token) {
          console.error('No token found in cookies');
          return;
        }

        const response = await axios.post(
          `${API_BASE_URL}/upload-file`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add the token to the Authorization header
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        const imageUrl = response?.data?.data?.urls[0]; // Get the secure URL
        formik.setFieldValue('personalDetails.image', imageUrl); // Set the URL to Formik
        setImage(imageUrl); // Set image URL for preview
        setImagePreview(URL.createObjectURL(file)); // Preview image locally
        console.log('Image uploaded successfully:', imageUrl);
        enqueueSnackbar('Image uploaded', { variant: 'success' });
      } catch (error) {
        console.error(
          'Image upload failed:',
          error.response?.data || error.message
        );
        enqueueSnackbar('image upload failed', { variant: 'error' });
        if (error.response?.status === 403) {
          navigate('/login');
        }
        alert('Image upload failed. Please try again.');
      }
    } else {
      console.error('No image selected.');
    }
  };
  const triggerFileInput = () => {
    document.getElementById('select').click();
  };
  // Handle image removal
  const handleImageRemove = () => {
    setImage(null);
    setImagePreview(null);
    formik.setFieldValue('personalDetails.image', '');
  };

  return (
    <div className="max-w-[500px] mx-auto border-[1px] shadow-card overflow-x-hidden">
      <div className="px-[37px] py-[31px]">
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="text-[32px] text-green-Primary_1 myFont">
              Complete profile
            </h3>
            <h3 className="font-semibold">1/3</h3>
          </div>
          <h3 className="font-normal text-[#4B4D52]">
            Let’s know you better 😊
          </h3>
        </div>
        <form onSubmit={formik.handleSubmit} className="mt-[23px]">
          <div className="mt-[27px]">
            <input
              id="select"
              type="file"
              onChange={(e) => handleImageUpload(e.target.files)}
              className="hidden"
            />
            <div className="flex flex-col justify-start">
              <div className="absolute mt-4 ml-16">
                {image ? (
                  <button
                    type="button"
                    onClick={handleImageRemove}
                    className="w-[18px] h-[18px] px-1 pb-[1px] text-2xl items-center justify-center flex text-white bg-red-500 rounded-full "
                  >
                    <FaMinus />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    className="w-[18px] h-[18px] text-2xl items-center justify-center flex  text-white bg-green-Primary_1 rounded-full "
                  >
                    +
                  </button>
                )}
              </div>
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="preview"
                  className="mt-3 w-[85px] object-cover  border-dashed border-gray-900 border-[1px] p-1 h-[85px] rounded-full"
                />
              ) : (
                <img
                  src={user}
                  alt="preview"
                  onClick={triggerFileInput}
                  className="mt-3 w-[85px] object-cover border-dashed border-gray-900 border-[1px] p-1 h-[85px] rounded-full"
                />
              )}
              {formik.errors.image && (
                <div className="flex justify-end text-[12px] font-bold italic text-[#E03069]">
                  {formik.errors.image}
                </div>
              )}
            </div>
          </div>

          <div className="mt-[27px] flex flex-col gap-3">
            <label>First Name</label>
            <input
              name="personalDetails.firstName"
              onChange={formik.handleChange}
              value={formik.values.personalDetails.firstName}
              className="w-full focus:outline-none  border-b-[2px] text-gray-700"
              placeholder="Enter your First Name"
            />
            {formik.errors.firstName && (
              <div className="flex justify-end font-bold  text-[12px] italic text-[#E03069]">
                {formik.errors.firstName}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3 mt-4">
            <label>Last Name</label>
            <input
              name="personalDetails.lastName"
              onChange={formik.handleChange}
              value={formik.values.personalDetails.lastName}
              className="w-full focus:outline-none border-b-[2px] text-gray-700"
              placeholder="Enter your Last name"
            />
            {formik.errors.lastName && (
              <div className="flex justify-end text-[12px] font-bold italic text-[#E03069]">
                {formik.errors.lastName}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3 mt-4">
            <label>E-mail</label>
            <input
              type="email"
              name="personalDetails.email"
              onChange={formik.handleChange}
              value={formik.values.personalDetails.email}
              className="w-full focus:outline-none border-b-[2px] text-gray-700"
              placeholder="Enter your Email"
            />
            {formik.errors.email && (
              <div className="flex justify-end text-[12px] font-bold italic text-[#E03069]">
                {formik.errors.email}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3 mt-4">
            <label>Gender</label>
            <select
              name="personalDetails.gender"
              onChange={formik.handleChange}
              value={formik.values.personalDetails.gender}
              className="w-full focus:outline-none border-b-[2px] text-gray-700"
            >
              <option value="">select your Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {formik.errors.gender && (
              <div className="flex justify-end text-[12px] font-bold italic text-[#E03069]">
                {formik.errors.gender}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3 mt-4">
            <label>Date of Birth</label>
            <input
              type="date"
              name="personalDetails.dateOfBirth"
              onChange={formik.handleChange}
              value={formik.values.personalDetails.dateOfBirth}
              className="w-full focus:outline-none border-b-[2px] text-gray-700"
            />
            {formik.errors.dateOfBirth && (
              <div className="flex justify-end font-bold  text-[12px] italic text-[#E03069]">
                {formik.errors.dateOfBirth}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3 mt-4">
            <label>Level of Study</label>
            <select
              name="personalDetails.levelOfStudy"
              onChange={formik.handleChange}
              value={formik.values.personalDetails.levelOfStudy}
              className="w-full focus:outline-none border-b-[2px] text-gray-700"
            >
              <option value="" className="text-gray-400">
                Choose your level
              </option>
              <option value="A-Level">A'Level</option>
              <option value="UTME">UTME</option>
              <option value="JAMB">O'Level (WAEC/NECO)</option>
            </select>
            {formik.errors.levelOfStudy && (
              <div className="flex justify-end font-bold text-[12px] italic text-[#E03069]">
                {formik.errors.levelOfStudy}
              </div>
            )}
          </div>

          <div className="relative mt-10 cursor-pointer">
            <button
              type="submit"
              className="absolute bg-green-Primary_1 rounded-[50px] w-full h-[50px] flex justify-center items-center text-white font-bold leading-[31.2px] text-[18px]"
            >
              Next
            </button>
            <div className="z-20 mt-[5px] bg-green-Primary_2 rounded-[50px] w-full h-[50px]" />
          </div>
        </form>
      </div>
    </div>
  );
}
