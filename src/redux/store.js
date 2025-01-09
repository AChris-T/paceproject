import { configureStore } from '@reduxjs/toolkit';
import { Auth } from './api/Auth';
import { setupListeners } from '@reduxjs/toolkit/query';
import formReducer from './FormSlice';

export const store = configureStore({
  reducer: {
    [Auth.reducerPath]: Auth.reducer,
    form: formReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Auth.middleware), // Disable the default serializable check for the Redux Toolkit Query slice
});

setupListeners(store.dispatch);
