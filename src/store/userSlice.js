import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const checkLogin = createAsyncThunk(
  "user/checkLogin",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/check-login-user", {
        credentials: "include",
      });
      const result = await res.json();
      if (!result.success || !result.user) {
        return rejectWithValue(result.message);
      }

      return result.user;
    } catch (error) {
      return rejectWithValue("something went wrong!");
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    userLoading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkLogin.pending, (state) => {
        state.userLoading = true;
        state.user = null;
      })
      .addCase(checkLogin.fulfilled, (state, action) => {
        state.userLoading = false;
        state.user = action.payload;
      })
      .addCase(checkLogin.rejected, (state, action) => {
        state.userLoading = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});

export default userSlice;
