import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  personalDetails: {
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    dateOfBirth: '',
    levelOfStudy: '',
    image: '',
  },
  department: {},
  subjects: {},
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    savePersonalDetails: (state, action) => {
      console.log('Updating personalDetails:', action.payload);
      state.personalDetails = action.payload;
    },
    saveDepartment: (state, action) => {
      state.department = action.payload;
    },
    saveSubjects: (state, action) => {
      state.subjects = action.payload;
    },
    resetForm: () => initialState,
  },
});

export const { savePersonalDetails, saveDepartment, saveSubjects, resetForm } =
  formSlice.actions;

export default formSlice.reducer;
