import { JSX } from "react";
import { useNavigate } from "react-router-dom";

export default function HomeButton(): JSX.Element {
  const navigate = useNavigate();

  const click = () => {
    navigate("/");
  };

  return <button onClick={click}>Home</button>;
}
