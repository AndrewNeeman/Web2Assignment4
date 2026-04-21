import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import type { JSX } from "react";
import "./MainLayout.css";

export default function MainLayout(): JSX.Element {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="layout-container">
      <Header openSidebar={toggleSidebar} />
      <div className="layout-middle">
        {isSidebarOpen && <Sidebar />}
        <main className="layout-content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
