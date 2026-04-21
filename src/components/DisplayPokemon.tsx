import type { Pokemon } from "./Pokemon";

export function DisplayPokemon(props: { pokemon: Pokemon | undefined }) {
  return (
    <div>
      <h3>Poke-Info</h3>
      <p>Name: {props.pokemon?.name}</p>
      <p>Type: {props.pokemon?.type}</p>
    </div>
  );
}
