import type { JSX } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

export function Header(): JSX.Element {
  return (
    <div className="navbar">
      <NavLink
        className="navbar-icon"
        style={({ isActive }) =>
          isActive ? { color: "#81b09c" } : { color: "white" }
        }
        to="/"
      >
        Home
      </NavLink>

      <NavLink
        className="navbar-icon"
        style={({ isActive }) =>
          isActive ? { color: "#81b09c" } : { color: "white" }
        }
        to="/clothings"
      >
        View All Clothing
      </NavLink>
      <br />
    </div>
  );
}
