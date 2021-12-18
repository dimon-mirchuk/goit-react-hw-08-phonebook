import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: null, token: null, isLoggedIn: false };

const slice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    reloginUser: (state, { payload: { name, email } }) => {
      state.user = { name, email };
      state.isLoggedIn = true;
    },
    setCredentials: (state = initialState, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});
export const { setCredentials, logOut, reloginUser } = slice.actions;
export default slice.reducer;
