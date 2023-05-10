import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCartOpen: false,
  value: "all",
  cart: [],
  item: "",
  items: [],
  slider: [
    {
      url: "https://www.apple.com/105/media/us/macbook-air-m1/2022/648bb92f-0bb4-452c-bfbc-2898641b22f5/anim/hero/medium_2x.mp4",
      position: "center",
      positionX: "10vw 0",
    },
    {
      url: "https://www.apple.com/105/media/us/macbook-pro-14-and-16/2022/1baf5961-c793-48e7-9efd-0d23cac1e101/anim/hero/large_2x.mp4",
      position: "flex-start",
      positionX: "0",
    },
    {
      url: "https://www.apple.com/105/media/us/iphone-14-pro/2022/a3e991f3-071e-454c-b714-1b2319bb97a8/anim/camera-intro/large_2x.mp4",
      position: "flex-start",
      positionX: "0",
    },
  ],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setItem: (state, action) => {
      state.item = action.payload;
    },

    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload.item];
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },

    increaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          item.count++;
        }
        return item;
      });
    },

    decreaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id && item.count > 1) {
          item.count--;
        }
        return item;
      });
    },

    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },

    setValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {
  setItems,
  setItem,
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
  setValue
} = cartSlice.actions;

export default cartSlice.reducer;
