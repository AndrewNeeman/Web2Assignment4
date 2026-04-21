import type { JSX } from "react";
import { useParams } from "react-router-dom";

export function DisplayAbout(): JSX.Element {
  const { employee } = useParams();
  return (
    <>
      <h1> Welcome to the about us page</h1>
      {employee === "jane" && (
        <h2>Jane is a software architect who loves Jenga</h2>
      )}
    </>
  );
}
