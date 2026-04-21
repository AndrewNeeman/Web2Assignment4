import { useState, type JSX, type SubmitEvent } from "react";
import type { Pokemon } from "./Pokemon";

export function AddPokemonForm({
  setAdded2,
}: {
  setAdded2: (val: Pokemon) => void;
}): JSX.Element {
  const [name, setName] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);

  const handleSubmission = async (event: SubmitEvent) => {
    event.preventDefault();

    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        name: name,
        type: type,
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
    setAdded2(result);
  };

  return (
    <form onSubmit={handleSubmission}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        placeholder="Enter name"
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="type">Type</label>
      <input
        type="text"
        placeholder="Enter type"
        onChange={(e) => setType(e.target.value)}
      />

      {name && type && <button type="submit">Add Pokemon</button>}
    </form>
  );
}
