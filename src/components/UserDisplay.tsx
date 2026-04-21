import type { JSX } from "react";

export function UserDisplay({
  user: { name, age },
}: {
  user: { name: string; age: number };
}): JSX.Element {
  return (
    <div>
      <h1>{name}</h1>
      <h2>{age}</h2>
    </div>
  );
}
