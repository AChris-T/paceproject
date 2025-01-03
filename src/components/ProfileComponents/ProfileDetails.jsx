import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { savePersonalDetails } from '../../redux/FormSlice';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import user from '../../assets/PaceAppLogo/userd.jpg';
import API_BASE_URL from '../../constants/Api';
import { FaMinus } from 'react-icons/fa';

export default function ProfileDetails({ onNext }) {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null); // To store image URL
  const [imagePreview, setImagePreview] = useState(null); // To store image preview

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
      // Adjust validation for the nested structure
      if (!values.personalDetails.firstName) errors.firstName = 'Required';
      if (!values.personalDetails.lastName) errors.lastName = 'Required';
      if (!values.personalDetails.email) errors.email = 'Required';
      if (!values.personalDetails.gender) errors.gender = 'Required';
      if (!values.personalDetails.dateOfBirth) errors.dateOfBirth = 'Required';
      if (!values.personalDetails.levelOfStudy)
        errors.levelOfStudy = 'Required';
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
          alert('Authentication token is missing. Please log in again.');
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
      } catch (error) {
        console.error(
          'Image upload failed:',
          error.response?.data || error.message
        );
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
    <div className="max-w-[740px] mx-auto border-[1px] shadow-card overflow-x-hidden">
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
                  className="mt-3 w-[85px] border-dashed border-gray-900 border-[1px] p-1 h-[85px] rounded-full"
                />
              ) : (
                <img
                  src={user}
                  alt="preview"
                  onClick={triggerFileInput}
                  className="mt-3 w-[85px] border-dashed border-gray-900 border-[1px] p-1 h-[85px] rounded-full"
                />
              )}
            </div>
          </div>

          <div className="mt-[27px]">
            <label>First Name</label>
            <input
              name="personalDetails.firstName"
              onChange={formik.handleChange}
              value={formik.values.personalDetails.firstName}
              className="w-full focus:outline-none border-b-[2px]"
            />
            {formik.errors.firstName && (
              <div className="flex justify-end text-red-500">
                {formik.errors.firstName}
              </div>
            )}
          </div>
          <div className="mt-[27px]">
            <label>Last Name</label>
            <input
              name="personalDetails.lastName"
              onChange={formik.handleChange}
              value={formik.values.personalDetails.lastName}
              className="w-full focus:outline-none border-b-[2px]"
            />
            {formik.errors.lastName && (
              <div className="flex justify-end text-red-500">
                {formik.errors.lastName}
              </div>
            )}
          </div>
          <div className="mt-[27px]">
            <label>E-mail</label>
            <input
              name="personalDetails.email"
              onChange={formik.handleChange}
              value={formik.values.personalDetails.email}
              className="w-full focus:outline-none border-b-[2px]"
            />
            {formik.errors.email && (
              <div className="flex justify-end text-red-500">
                {formik.errors.email}
              </div>
            )}
          </div>
          <div className="mt-[27px]">
            <label>Gender</label>
            <input
              name="personalDetails.gender"
              onChange={formik.handleChange}
              value={formik.values.personalDetails.gender}
              className="w-full focus:outline-none border-b-[2px]"
            />
            {formik.errors.gender && (
              <div className="flex justify-end text-red-500">
                {formik.errors.gender}
              </div>
            )}
          </div>
          <div className="mt-[27px]">
            <label>Date of Birth</label>
            <input
              type="date"
              name="personalDetails.dateOfBirth"
              onChange={formik.handleChange}
              value={formik.values.personalDetails.dateOfBirth}
              className="w-full focus:outline-none border-b-[2px]"
            />
            {formik.errors.dateOfBirth && (
              <div className="flex justify-end text-red-500">
                {formik.errors.dateOfBirth}
              </div>
            )}
          </div>
          <div className="mt-[27px]">
            <label>Level of Study</label>
            <input
              name="personalDetails.levelOfStudy"
              onChange={formik.handleChange}
              value={formik.values.personalDetails.levelOfStudy}
              className="w-full focus:outline-none border-b-[2px]"
            />
            {formik.errors.levelOfStudy && (
              <div className="flex justify-end text-red-500">
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
