import { Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

const Layout = () => {
  return (
    <>
    <header>
        <Navbar />
    </header>
    <main>
      <Outlet />
    </main>
    <footer>
        <Footer />
    </footer>
    </>
  );
}

export default Layout;