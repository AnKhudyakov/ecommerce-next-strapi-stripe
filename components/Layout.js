import Head from "next/head";
import Nav from "./Nav";
import { UserProvider } from "../lib/authContext";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Footer from "./Footer";
import CartMenu from "./CartMenu";
import ProfileMenu from "./ProfileMenu";

const Layout = ({ user, loading = false, children }) => (
  <UserProvider value={{ user, loading }}>
    <Head>
      <title>Online Store</title>
    </Head>
    <Nav />
    <main className="px-4">
      <div
        className="
          flex
          justify-center
          items-center
          bg-white
          mx-auto
          w-2/4
          rounded-lg
          my-16
          p-16
        "
      >
        <div className="text-2xl font-medium">{children}</div>
      </div>
    </main>
    <CartMenu />
    <ProfileMenu/>
    <Footer />
  </UserProvider>
);
export default Layout;
