import { JSX, useState, useEffect } from "react";
import { Clothing } from "./Clothing";
import { DisplayClothing } from "./DisplayClothing";

export function DisplayClothingHome(): JSX.Element {
  const [clothing, setClothing] = useState<Clothing[]>([]);

  useEffect(() => {
    const callGetAllClothing = async () => {
      const response = await fetch("http://localhost:1339/clothingItems", {
        method: "GET",
      });
      const result = await response.json();
      setClothing(result);
    };

    callGetAllClothing();
  }, []);

  return (
    <>
      <DisplayClothing clothing={clothing} />
    </>
  );
}
