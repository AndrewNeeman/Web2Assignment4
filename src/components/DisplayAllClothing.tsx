import { useState, type JSX } from "react";
import type { ClothingWithId } from "./Clothing";
import { ListClothings } from "./ListClothings";
import "./DisplayAllClothing.css";

export function DisplayAllClothing(): JSX.Element {
  const [clothings, setClothings] = useState<ClothingWithId[]>([]);

  return (
    <>
      <button onClick={() => handleGetAllClothing(setClothings)}>
        Retrieve all clothing
      </button>
      <ListClothings clothings={clothings} />
    </>
  );
}

async function handleGetAllClothing(
  setClothings: (clothing: ClothingWithId[]) => void,
) {
  const response = await fetch("http://localhost:1339/clothings/all", {
    method: "GET",
  });
  const result = await response.json();
  setClothings(result);
}
