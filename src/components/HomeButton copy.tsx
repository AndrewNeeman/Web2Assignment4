import type { JSX } from "react";
import { useNavigate } from "react-router-dom";

export function HomeButton(): JSX.Element {
  const navigate = useNavigate();
  const handleHomeRedirect = () => navigate("/");
  return <button onClick={handleHomeRedirect}>HOME</button>;
}
