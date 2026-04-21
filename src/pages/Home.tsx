import { type JSX } from "react";
import "./Home.css";

export default function Home(): JSX.Element {
  return (
    <div className="home-container">
      <h1 className="welcome-text">Welcome to our Wardrobe App!</h1>
    </div>
  );
}
