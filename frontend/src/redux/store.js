import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth/authSlice';
import employeeReducer from './auth/employeeSlice';
import companyReducer from './auth/companySlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        employee: employeeReducer,
        company : companyReducer
    },
})