import Layout from "../src/components/Layout";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../lib/theme";
import { Provider } from "react-redux";
import { store } from "./index";
import CheckoutForm from "../src/components/checkout/CheckoutForm";
import { useFetchUser } from "../lib/authContext";

const Checkout = () => {
    const { user, loading } = useFetchUser();
  return (
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Layout user={user}>
        <CheckoutForm />
      </Layout>
    </ThemeProvider>
  </Provider>
  );
};

export default Checkout;
