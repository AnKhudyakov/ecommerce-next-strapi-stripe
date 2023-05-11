import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addressFiedls: [
    { label: "First Name", name: "firstName", column: "span 2" },
    { label: "Last Name", name: "lastName", column: "span 2" },
    { label: "Country", name: "country", column: "span 4" },
    { label: "Street Address", name: "street1", column: "span 2" },
    { label: "Street Address 2 (optional)", name: "street2", column: "span 2" },
    { label: "City", name: "city", column: "span 2" },
    { label: "State", name: "state", column: "1fr" },
    { label: "Zip Code", name: "zipCode", column: "1fr" },
  ],
  initialValues: {
    billingAddress: {
      firstName: "",
      lastName: "",
      country: "",
      street1: "",
      street2: "",
      city: "",
      state: "",
      zipCode: "",
    },
    shippingAddress: {
      isSameAddress: true,
      firstName: "",
      lastName: "",
      country: "",
      street1: "",
      street2: "",
      city: "",
      state: "",
      zipCode: "",
    },
    email: "",
    phoneNumber: "",
  },
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {},
});

export const {} = checkoutSlice.actions;

export default checkoutSlice.reducer;
