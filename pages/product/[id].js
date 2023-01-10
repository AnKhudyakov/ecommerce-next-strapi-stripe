import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../../components/Layout';
import { fetcher } from '../../lib/api';
import {
  getTokenFromLocalCookie,
  getTokenFromServerCookie,
  getUserFromLocalCookie,
} from '../../lib/auth';
import { useFetchUser } from '../../lib/authContext';
import markdownToHtml from '../../lib/markdownToHtml';

const Film = ({ film, jwt, plot, error }) => {
  const { user, loading } = useFetchUser();
  const router = useRouter();

  const handleChange = (e) => {
    setReview({ value: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          data: {
            review: review.value,
            reviewer: await getUserFromLocalCookie(),
            Film: film.id,
          },
        }),
      });
      router.reload();
    } catch (error) {
      console.error('error with request', error);
    }
  };

  if (error) {
    return (
      <Layout>
        <p>{error}</p>
      </Layout>
    );
  } else {
    return (
      <Layout user={user}>
        
      </Layout>
    );
  }
};

export async function getStaticProps({ req, params }) {
  const { id } = params;
  const jwt =
    typeof window !== 'undefined'
      ? getTokenFromLocalCookie
      : getTokenFromServerCookie(req);
  const ProductResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/${id}`
  );
  if (ProductResponse.data) {
    const plot = await markdownToHtml(ProductResponse.data.attributes.plot);
    return {
      props: {
        film: ProductResponse.data,
        plot,
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

export default Film;
