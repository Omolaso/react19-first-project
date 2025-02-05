import { useState, useContext, type ChangeEvent } from "react";
import { useNavigate } from "react-router";
import type { DataProps } from "constants/reducerFunc";
import { FetchedDataContext, type FetchedDataContextProps } from "~/root";

const DataView = () => {
  const { state } = useContext(FetchedDataContext) as FetchedDataContextProps;
  const [inputValue, setInputValue] = useState<string>("");
  const [todos, setTodos] = useState<DataProps[]>(state?.fetchedData ?? []);
  const navigate = useNavigate();

  const handleFilterData = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const filteredData = state?.fetchedData?.filter((data) =>
      data.title.toLowerCase().includes(value.toLowerCase())
    );

    setTodos(filteredData);
  };

  return (
    <div className="flex items-center justify-center pt-16 pb-4">
      <div className="flex flex-col gap-8">
        <div className="flex flex-row items-center justify-between">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => handleFilterData(e)}
            className="bg-white rounded p-2 text-black"
          />
          <button type="button" onClick={() => navigate("/")}>
            Go to Home
          </button>
        </div>

        {todos?.length > 0 && (
          <ul>
            {todos?.map((todo) => (
              <li key={todo?.id}>{todo?.title}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DataView;
