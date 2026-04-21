import { Link } from "react-router-dom";
import { JSX } from "react";
import "./Sidebar.css";
import wardrobeIcon from "../assets/wardrobeIcon.png";
import dressUpIcon from "../assets/dressIcon.png";
import socialIcon from "../assets/peopleIcon.png";
import statsIcon from "../assets/percentageIcon.png";
import springCleanIcon from "../assets/broomIcon.png";
import outfitsIcon from "../assets/hangerIcon.png";

export default function Sidebar(): JSX.Element {
  return (
    <nav className="sidebar">
      <ul className="nav-list">
        <li>
          <Link to="/" className="nav-link">
            <img src={wardrobeIcon} alt="Wardrobe" className="nav-icon"></img>
          </Link>
        </li>
        <li>
          <Link to="/dressUp" className="nav-link">
            <img src={dressUpIcon} alt="Dress Up" className="nav-icon"></img>
          </Link>
        </li>
        <li>
          <Link to="/social" className="nav-link">
            <img src={socialIcon} alt="Social" className="nav-icon"></img>
          </Link>
        </li>
        <li>
          <Link to="/stats" className="nav-link">
            <img src={statsIcon} alt="Statistics" className="nav-icon"></img>
          </Link>
        </li>
        <li>
          <Link to="/springCleaning" className="nav-link">
            <img
              src={springCleanIcon}
              alt="Statistics"
              className="nav-icon"
            ></img>
          </Link>
        </li>
        <li>
          <Link to="/outfits" className="nav-link">
            <img src={outfitsIcon} alt="Statistics" className="nav-icon"></img>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
