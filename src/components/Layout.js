import Head from "next/head";
import Nav from "./Nav";
import { UserProvider } from "../../lib/authContext";
import Footer from "./Footer";
import CartMenu from "./CartMenu";
import ProfileMenu from "./ProfileMenu";
import SearchMenu from "./SearchMenu";
import NavMenu from "./NavMenu";

const Layout = ({ user, loading = false, children }) => (
  <UserProvider value={{ user, loading }}>
    <Head>
      <title>Online Store</title>
    </Head>
    <Nav />
    <main className="px-4 scrollBehavior-smooth ">
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
          scroll
        "
      >
        <div className="text-2xl font-medium scrollBehavior-smooth">
          {children}
        </div>
      </div>
    </main>
    <SearchMenu />
    <CartMenu />
    <ProfileMenu />
    <NavMenu />
    <Footer />
  </UserProvider>
);
export default Layout;
