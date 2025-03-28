import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import 'react-image-upload/dist/index.css';
import { useProilfeCreationMutation } from '../redux/api/Auth';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileDetails from '../components/ProfileComponents/ProfileDetails';
import Subject from '../components/ProfileComponents/Subject';
import Department from '../components/ProfileComponents/Department';

export default function Profile() {
  const [step, setStep] = useState(1);
  const formData = useSelector((state) => state.form);
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
    if (!formData.subjectsOfInterest) {
      console.log('Subjects are missing.');
      return;
    }

    if (step === 3) {
      try {
        await profileCreation({
          ...formData.personalDetails,
          ...formData.department,
          ...formData.subjectsOfInterest,
        }).unwrap();
        enqueueSnackbar('Profile created successfully!', {
          variant: 'success',
        });
        navigate('/app/home');
        // Navigate to Step 4 after successful submission
      } catch (error) {
        console.error('Failed to create profile:', error);
        enqueueSnackbar('Error creating profile. Please try again.', {
          variant: 'error',
        });
        setStep(1); // Reset to Step 1 on failure
      }
    } else {
      setStep(step + 1);
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
      {/*     {step === 4 && (
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
