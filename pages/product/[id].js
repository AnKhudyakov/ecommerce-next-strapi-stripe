import Layout from "../../src/components/Layout";
import { fetcher } from "../../lib/api";
import {
  getTokenFromLocalCookie,
  getTokenFromServerCookie,
  getUserFromLocalCookie,
} from "../../lib/auth";
import { useFetchUser } from "../../lib/authContext";
import markdownToHtml from "../../lib/markdownToHtml";
import { useDispatch } from "react-redux";
import { store } from "../index";
import ProductCard from "../../src/components/ProductCard";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../lib/theme";
import { memo } from "react";

const Id = memo(({ item, items, description, error }) => {
  const { user, loading } = useFetchUser();
  if (error) {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Layout>
            <p>{error}</p>
          </Layout>
        </ThemeProvider>
      </Provider>
    );
  } else {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Layout user={user}>
            <ProductCard item={item} description={description} items={items} />
          </Layout>
        </ThemeProvider>
      </Provider>
    );
  }
});

export async function getServerSideProps({ req, params }) {
  const { id } = params;
  //   const jwt =
  //     typeof window !== 'undefined'
  //       ? getTokenFromLocalCookie
  //       : getTokenFromServerCookie(req);
  const ProductResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}products/${id}?populate=%2A`
  );
  const ProductsResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}products?populate=%2A`
  );
  if (ProductResponse.data) {
    const description = await markdownToHtml(
      ProductResponse.data.attributes.description
    );
    return {
      props: {
        item: ProductResponse.data,
        items: ProductsResponse,
        description,
      },
    };
  } else {
    return {
      props: {
        error: ProductResponse.error.message,
      },
    };
  }
}

export default Id;
