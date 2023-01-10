import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isProfileOpen: false,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setIsProfileOpen: (state) => {
      state.isProfileOpen = !state.isProfileOpen;
    },
  },
});

export const { setIsProfileOpen } = profileSlice.actions;

export default profileSlice.reducer;
