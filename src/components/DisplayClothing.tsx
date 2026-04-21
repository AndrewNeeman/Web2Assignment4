import { JSX } from "react";
import { Clothing } from "./Clothing";

interface DisplayClothingProp {
  clothing: Clothing[];
}

export function DisplayClothing({
  clothing,
}: DisplayClothingProp): JSX.Element {
    

  const clothingItems = clothing.map((item) => (
    <div key={item.name}>
      <img src={item.image} alt={item.name} className="item" />
      <img src={item.favourite} alt="Favourite" className="star" />
    </div>
  ));

  return (
    <div className="clothing-items">
      <ul>{clothingItems}</ul>
    </div>
  );
}
