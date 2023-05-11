import Layout from "../src/components/Layout";
import { useFetchUser } from "../lib/authContext";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../lib/theme";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../state";
import profileReducer from "../state/profileSlice";
import checkoutReducer from "../state/checkoutSlice";
import HomePage from "../src/components/home/Home";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    profile: profileReducer,
    checkout: checkoutReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default function Home() {
  const { user, loading } = useFetchUser();
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Layout user={user}>
          <HomePage />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}
