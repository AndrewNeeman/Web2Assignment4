import { useState } from "react";
import type { Pokemon } from "./Pokemon";
import { DisplayPokemon } from "./DisplayPokemon";

export function SinglePokemon() {
  const [pokemon, setPokemon] = useState<Pokemon>();

  const callGetPokemon = async () => {
    const response = await fetch("http://localhost:1339/pokemons/mimikyu", {
      method: "GET",
    });
    const result = await response.json();
    setPokemon(result);
  };

  return (
    <>
      <button onClick={callGetPokemon}>Find Mimikyu</button>
      <DisplayPokemon pokemon={pokemon} />
    </>
  );
}
