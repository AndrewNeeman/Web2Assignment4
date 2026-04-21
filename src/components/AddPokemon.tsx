import { useState, type JSX } from "react";
import type { Pokemon } from "./Pokemon";
import { AddPokemonForm } from "./AddPokemonForm";
import { DisplayPokemon } from "./DisplayPokemon";

export function AddPokemon(): JSX.Element {
  const [addedPokemon, setAddedPokemon] = useState<Pokemon>();

  return (
    <>
      <AddPokemonForm setAdded={setAddedPokemon} />

      <DisplayPokemon pokemon={addedPokemon} />
    </>
  );
}
