"use client";

import {configureStore} from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useDispatch,useSelector} from 'react-redux'
import { authSlice } from './slices/AuthSlice';
export const store = configureStore({
    reducer:{
        auth:authSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector;