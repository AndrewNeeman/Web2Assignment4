import { type JSX, useState } from "react";
import "./Home.css";

export default function Home(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <main className="home-content">
      <input
        type="text"
        placeholder="Search a piece of clothing..."
        className="searchbar"
        value={searchTerm}
        onChange={(search) => setSearchTerm(search.target.value)}
      />
      <p>Search result: {searchTerm}</p>
    </main>
  );
}
