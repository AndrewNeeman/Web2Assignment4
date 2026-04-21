import type { JSX } from "react";

export function DisplayList(): JSX.Element {
  const usernames = ["Joes897", "Jane34", "Qingwen345", "Bibi23"];

  const listItems = usernames.map((username) => (
    <li key={username}>{username}</li>
  ));

  return <ul>{listItems}</ul>;
}
