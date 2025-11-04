// src/layout/MainLayout.jsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-base-100 text-base-content">
      <Navbar />
      <main className="grow p-6">{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;
