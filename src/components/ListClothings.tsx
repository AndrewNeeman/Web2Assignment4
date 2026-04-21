import type { JSX } from "react";
import type { ClothingWithId } from "./Clothing";

export function ListClothings({
  clothings: clothings,
}: {
  clothings: ClothingWithId[];
}): JSX.Element {
  return (
    <div>
      <h2>WARDROBE</h2>
      <ul>
        {clothings.map((clothing) => (
          <li key={clothing._id}>
            <span className="list-header">Description:</span>{" "}
            {clothing.description}
            <br />
            <span className="list-header">Brand:</span> {clothing.brand}
            <br />
            <span className="list-header">Material:</span> {clothing.material}
            <br />
            <span className="list-header">Size:</span> {clothing.size}
            <br />
            <span className="list-header">Color:</span> {clothing.color}
          </li>
        ))}
      </ul>
    </div>
  );
}
