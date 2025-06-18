import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IAuthFailure,
  IAuthResponse,
  IAuthSlice,
  IUserProfile,
} from "./interface/IAuthSlice";
import { SignupData } from "@/components/Auth/Schema/RegisterSchema";
import { Api } from "@/utils/Api";
import { AxiosError } from "axios";
import secureLocalStorage from "react-secure-storage";
import { LoginData } from "@/components/Auth/Schema/LoginSchema";

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

export const handleLogin = createAsyncThunk<
  IAuthResponse,
  LoginData,
  { rejectValue: IAuthFailure }
>("auth/handleLogin", async (data, { rejectWithValue }) => {
  try {
    const response = await Api.post("/auth/login", data);
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
  profile: null,
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
      state.isLoading = false;
      state.error = payload;
    });
    builder.addCase(handleLogin.pending, (state) => {
      state.isLoading = true;
      state.error = {};
    });
    builder.addCase(handleLogin.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      secureLocalStorage.setItem("token", payload.token);
      state.isAuthenticated = true;
    });
    builder.addCase(handleLogin.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
    builder.addCase(fetchProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProfile.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.profile = payload;
    });
    builder.addCase(fetchProfile.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload!;
    });
  },
});

export const fetchProfile = createAsyncThunk<
  IUserProfile,
  void,
  { rejectValue: IAuthFailure }
>("auth/fetchProfile", async (_, { rejectWithValue }) => {
  try {
    const token = secureLocalStorage.getItem("token");
    const response = await Api.get("/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    const err = error as AxiosError<IAuthFailure>;
    if (!err.response) throw error;
    return rejectWithValue(err.response.data);
  }
});
