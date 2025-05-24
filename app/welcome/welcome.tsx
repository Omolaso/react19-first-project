import { useState, type ChangeEvent, type SyntheticEvent } from "react";

// create an array with name and id. Iterate over the array and display the name in an input and id as key.
// Create a button to add more items into the array and each name input should be modifiable.
// When adding more items into the array, ensure there isn't an empty field.

interface Props {
  name: string;
  id: string;
}

export function Welcome() {
  const [array, setArray] = useState<Props[]>([
    { name: "Alice", id: "1" },
    { name: "John", id: "2" },
  ]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    setArray((prev) =>
      prev.map((item, itemIndex) =>
        itemIndex === index ? { ...item, name: value } : item
      )
    );
  };

  const handleAddMore = () => {
    const emptyField = array.find((item) => item.name === "");

    if (emptyField) {
      alert("Empty");
      return;
    }

    const newItem: Props = {
      name: "",
      id: `${Number(array[array.length - 1].id) + 1}`,
    };

    setArray((prev) => [...prev, newItem]);
  };

  return (
    <main className="flex items-center justify-center min-h-screen w-full">
      <div className="flex flex-col gap-6">
        {array.map((item, index) => (
          <input
            key={item.id}
            type="text"
            value={item.name}
            onChange={(e) => handleOnChange(e, index)}
            className="p-2 border-white border"
          />
        ))}

        <button
          type="button"
          onClick={handleAddMore}
          className="bg-red-500 p-2"
        >
          Add More
        </button>
      </div>
    </main>
  );
}
