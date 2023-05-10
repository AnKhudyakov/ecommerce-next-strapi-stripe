import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isProfileOpen: false,
  isSearchOpen: false,
  isMenuOpen: false,
  anchorEl: null
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
    setIsMenuOpen: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    setAnchorEl: (state, action) => {
      state.anchorEl = action.payload;
    },
  },
});

export const { setIsProfileOpen, setIsSearchOpen, setIsMenuOpen, setAnchorEl } =
  profileSlice.actions;

export default profileSlice.reducer;
