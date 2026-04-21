import { useState, type JSX } from "react";
import type { Pokemon } from "./Pokemon";
import { AddPokemonForm } from "./AddPokemonForm";
import { DisplayPokemon } from "./DisplayPokemon";

export function AddPokemon2(): JSX.Element {
  const [addedPokemon2, setAddedPokemon2] = useState<Pokemon>();

  return (
    <>
      <AddPokemonForm setAdded={setAddedPokemon2} />

      <DisplayPokemon pokemon={addedPokemon2} />
    </>
  );
}
