import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query';
import { reduxApiSlice } from "../api/reduxApiSlice";
import authReducer from '../features/authSlice';

export const store = configureStore({
    reducer: {
        [reduxApiSlice.reducerPath]: reduxApiSlice.reducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(reduxApiSlice.middleware),
    devTools: true
});

setupListeners(store.dispatch);