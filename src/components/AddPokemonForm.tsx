import { useRef, type JSX, type SubmitEvent } from "react";
import type { Pokemon } from "./Pokemon";

export function AddPokemonForm({
  setAdded,
}: {
  setAdded: (val: Pokemon) => void;
}): JSX.Element {
  const name = useRef<HTMLInputElement>(null);
  const type = useRef<HTMLInputElement>(null);

  const handleSubmission = async (event: SubmitEvent) => {
    event.preventDefault();

    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        name: name.current?.value || "",
        type: type.current?.value || "",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    const response = await fetch(
      "http://localhost:1339/pokemons",
      requestOptions,
    );
    const result = await response.json();
    setAdded(result);
  };

  return (
    <form onSubmit={handleSubmission}>
      <label htmlFor="name">Name</label>
      <input type="text" placeholder="Enter name" ref={name} required />

      <label htmlFor="type">Type</label>
      <input type="text" placeholder="Enter type" ref={type} required />

      <button type="submit">Add Pokemon</button>
    </form>
  );
}
