import { JSX } from "react";
import "./Header.css";
import avatar from "../assets/genericAvatar.png";
import dropdown from "../assets/hamburgerIcon.png";

interface sidebarOpen {
  openSidebar: () => void;
}

export default function Header({ openSidebar }: sidebarOpen): JSX.Element {
  return (
    <header className="header">
      <button className="menu-button" onClick={openSidebar}>
        <img src={dropdown} alt="Menu Dropdown" className="header-icon" />
      </button>
      <h2 className="header-title">WARDROBE</h2>
      <button className="profile-avatar">
        <img src={avatar} alt="Profile avatar" className="header-icon" />
      </button>
    </header>
  );
}
