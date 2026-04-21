import { type JSX } from "react";
import { Link } from "react-router-dom";
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

      <nav className="header-nav">
        <Link to="/" className="nav-btn">Home</Link>
        <Link to="/all" className="nav-btn">View All Clothing</Link>
        <Link to="/one" className="nav-btn">Retrieve Clothing Piece</Link>
        <Link to="/create" className="nav-btn">Create Clothing</Link>
      </nav>

      <button className="profile-avatar">
        <img src={avatar} alt="Profile avatar" className="header-icon" />
      </button>
    </header>
  );
}
