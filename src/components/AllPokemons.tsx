import { useState, type JSX } from "react";
import type { PokemonWithId } from "./Pokemon";
import { ListPokemons } from "./ListPokemons";

export function AllPokemons(): JSX.Element {
  const [pokemons, setPokemons] = useState<PokemonWithId[]>([]);

  return (
    <>
      <button onClick={() => handleGetAllPokemons(setPokemons)}>
        Get list of all pokemon
      </button>
      <ListPokemons pokemons={pokemons} />
    </>
  );
}

async function handleGetAllPokemons(
  setPokemons: (pokemon: PokemonWithId[]) => void,
) {
  const response = await fetch("http://localhost:1339/pokemons/all", {
    method: "GET",
  });
  const result = await response.json();
  setPokemons(result);
}
