import { useState, type ChangeEvent, type SyntheticEvent } from "react";

// Make one array state of objects, each object will have name and id.
// On UI iterate over array and show inputs. And also add button to add new object in the array. But before adding new object check if all objects have name and id

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
      prev.map((item, arrayIndex) =>
        arrayIndex === index ? { ...item, name: value } : item
      )
    );
  };

  const handleAddMore = () => {
    const notEmpty = array.find((item) => item.name === "" || item.id === "");

    if (notEmpty) {
      alert("empty");
      return;
    }

    setArray((prev) => [
      ...prev,
      { name: "", id: `${Number(array[array.length - 1].id) + 1}` },
    ]);
  };

  return (
    <main className="flex items-center justify-center min-h-screen w-full">
      <div className="flex flex-col gap-6">
        {array.map((item, index) => (
          <div key={item.id} className="flex flex-row items-center gap-4">
            <input
              type="text"
              className="p-2 border-white border"
              onChange={(e) => handleOnChange(e, index)}
              value={array[index].name}
            />
          </div>
        ))}

        <button
          onClick={handleAddMore}
          type="button"
          className="bg-red-400 p-4"
        >
          Add More
        </button>
      </div>
    </main>
  );
}
