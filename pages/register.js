import { useFetchUser } from "../lib/authContext";
import Layout from "../src/components/Layout";
import { default as RegisterComponent } from "../src/components/Register";
import { store } from "./index";
import { Provider } from "react-redux";
import { theme } from "../lib/theme";
import { ThemeProvider } from "@mui/material/styles";

const Register = () => {
  const { user, loading } = useFetchUser();
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Layout user={user}>
          <RegisterComponent />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
};

export default Register;
