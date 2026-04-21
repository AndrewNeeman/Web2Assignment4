import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Outlet } from "react-router-dom";
import type { JSX } from "react";

export function MainLayout(): JSX.Element {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
