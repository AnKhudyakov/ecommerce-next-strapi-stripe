import Layout from "../../src/components/Layout";
import { fetcher } from "../../lib/api";
import { useFetchUser } from "../../lib/authContext";
import markdownToHtml from "../../lib/markdownToHtml";
import { store } from "../index";
import ProductCard from "../../src/components/ProductCard";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../lib/theme";

const Id = ({ item, items, error, description }) => {
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
            <ProductCard item={item} items={items} description={description} />
          </Layout>
        </ThemeProvider>
      </Provider>
    );
  }
};

export async function getStaticPaths() {
  const products = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products`
  );
  const paths = products.data.map((product) => ({
    params: { id: `${product.id}` },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const ProductResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products/${id}?populate=%2A`
  );
  const ProductsResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products?populate=%2A`
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
