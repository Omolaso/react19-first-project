import { useState, type ChangeEvent, type SyntheticEvent } from "react";

const users = ["Alice", "Bob", "Charlie", "David"];

export function Welcome() {
  const newUsers = users.slice();
  const [filtered, setFiltered] = useState(newUsers);
  const [inputValue, setInputValue] = useState("");

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const filteredNewUsers = newUsers.filter(
      (item) => item.toLowerCase() === value.toLowerCase()
    );

    setFiltered(filteredNewUsers);
  };

  return (
    <main className="flex items-center justify-center min-h-screen w-full">
      <div className="flex flex-col gap-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => handleFilter(e)}
          className="bg-white text-black p-2"
        />

        <ul>
          {filtered.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
