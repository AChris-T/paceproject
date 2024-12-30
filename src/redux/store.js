import { configureStore } from '@reduxjs/toolkit';
import { Auth } from './api/Auth';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    /*     auth: AuthReducer,
     */ [Auth.reducerPath]: Auth.reducer,
    /*  [ProfileApi.reducerPath]: ProfileApi.reducer,
    [CountryStateApi.reducerPath]: CountryStateApi.reducer,
    [FacultyDepartmentApi.reducerPath]: FacultyDepartmentApi.reducer, */
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Auth.middleware), // Disable the default serializable check for the Redux Toolkit Query slice
});

setupListeners(store.dispatch);
