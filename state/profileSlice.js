import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isProfileOpen: false,
  isSearchOpen: false,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setIsProfileOpen: (state) => {
      state.isProfileOpen = !state.isProfileOpen;
    },
    setIsSearchOpen: (state) => {
      state.isSearchOpen = !state.isSearchOpen;
    },
  },
});

export const { setIsProfileOpen, setIsSearchOpen } = profileSlice.actions;

export default profileSlice.reducer;
