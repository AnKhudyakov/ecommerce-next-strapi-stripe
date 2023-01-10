import Layout from "../components/Layout";
import { useFetchUser } from "../lib/authContext";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../lib/theme";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../state";
import profileReducer from "../state/profileSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    profile: profileReducer,
  },
});

export default function Home() {
  const { user, loading } = useFetchUser();
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Layout user={user}></Layout>
      </ThemeProvider>
    </Provider>
  );
}
