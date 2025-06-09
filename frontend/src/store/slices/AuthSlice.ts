import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IAuthFailure,
  IAuthResponse,
  IAuthSlice,
} from "./interface/IAuthSlice";
import { SignupData } from "@/components/Auth/Schema/RegisterSchema";
import { Api } from "@/utils/Api";
import { AxiosError } from "axios";
import secureLocalStorage from "react-secure-storage";

const auth = secureLocalStorage.getItem("auth") || null;

export const handleRegister = createAsyncThunk<
  IAuthResponse,
  SignupData,
  { rejectValue: IAuthFailure }
>("auth/handleRegister", async (data, { rejectWithValue }) => {
  try {
    const response = await Api.post("/auth", data);
    return response.data;
  } catch (error) {
    const err = error as AxiosError<IAuthFailure>;
    if (!err.response) throw error;
    return rejectWithValue(err.response.data);
  }
});

const initialState: IAuthSlice = {
  auth: {} as IAuthResponse,
  isLoading: false,
  error: {} as IAuthFailure,
  isAuthenticated: Boolean(auth),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(handleRegister.pending, (state, { payload }) => {
      state.isLoading = true;
      state.error = {};
    });
    builder.addCase(handleRegister.fulfilled, (state, { payload }) => {
      state.isLoading = false;
    });
    builder.addCase(handleRegister.rejected, (state, { payload }) => {
      state.isLoading = true;
      state.error = payload;
    });
  },
});
