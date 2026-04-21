import type { JSX } from "react";
import type { PokemonWithId } from "./Pokemon";

export function ListPokemons ({
  pokemons,
}: {
  pokemons: PokemonWithId[];
}): JSX.Element {
  return (
    <div>
      <h2>Poke-List</h2>
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon._id}>
            Name: {pokemon.name} Type: {pokemon.type}
          </li>
        ))}
      </ul>
    </div>
  );
}
