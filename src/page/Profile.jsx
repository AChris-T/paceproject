import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import ImageUploader from 'react-image-upload';
import 'react-image-upload/dist/index.css';
import { useProilfeCreationMutation } from '../redux/api/Auth';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { resetForm } from '../redux/FormSlice';
import ProfileDetails from '../components/ProfileComponents/ProfileDetails';
import Subject from '../components/ProfileComponents/Subject';
import Department from '../components/ProfileComponents/Department';

export default function Profile() {
  const [step, setStep] = useState(1);
  const formData = useSelector((state) => state.form);
  const dispatch = useDispatch();
  const [profileCreation, { isLoading }] = useProilfeCreationMutation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    console.log('Submitting form with data:', formData);

    if (!formData.personalDetails) {
      alert('Personal details are missing.');
      return;
    }
    if (!formData.department) {
      alert('Department details are missing.');
      return;
    }
    if (!formData.subjects) {
      alert('Subjects are missing.');
      return;
    }

    try {
      await profileCreation({
        ...formData.personalDetails,
        ...formData.department,
        ...formData.subjects,
      }).unwrap();
      enqueueSnackbar('Profile created successfully!', { variant: 'success' });
      navigate('/app/home');
    } catch (error) {
      console.error('Failed to create profile:', error);
      enqueueSnackbar(error, { variant: error });
      setStep(1);
    }
  };

  return (
    <div>
      {step === 1 && <ProfileDetails onNext={() => setStep(2)} />}
      {step === 2 && (
        <Department onNext={() => setStep(3)} onBack={() => setStep(1)} />
      )}

      {step === 3 && (
        <Subject
          handleSubmit={() => {
            handleSubmit();
          }}
          onBack={() => setStep(2)}
        />
      )}
      {/* {step === 4 && (
        <div>
          <h2>Review & Submit</h2>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
          <button onClick={() => setStep(3)}>Back</button>
          <button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      )} */}
    </div>
  );
}
