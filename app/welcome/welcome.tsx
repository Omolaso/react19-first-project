import { useState, type ChangeEvent, type SyntheticEvent } from "react";

// create an array with name and id. Iterate over the array and display the name in an input and id as key.
// Create a button to add more items into the array and each name input should be modifiable.
// When adding more items into the array, ensure there isn't an empty field. 

export function Welcome() {
  return (
    <main className="flex items-center justify-center min-h-screen w-full">
      <div className="flex flex-col gap-6">
        <p>Hi</p>
      </div>
    </main>
  );
}
