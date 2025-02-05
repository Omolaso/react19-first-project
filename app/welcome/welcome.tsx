import { ACTIONS } from "constants/reducerFunc";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { FetchedDataContext, type FetchedDataContextProps } from "~/root";

export function Welcome() {
  const { state, dispatch } = useContext(
    FetchedDataContext
  ) as FetchedDataContextProps;
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;

    const fetchDataAsync = async () => {
      dispatch({ type: ACTIONS.IS_LOADING, payload: true });

      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos");
        const data = await res.json();
        dispatch({ type: ACTIONS.GET_DATA, payload: data });
      } catch (error) {
        console.log(error);
      } finally {
        dispatch({ type: ACTIONS.IS_LOADING, payload: false });
      }
    };

    fetchDataAsync();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      {state.isLoading ? (
        <span className="text-white">Loading...</span>
      ) : (
        <div className="flex items-center justify-center pt-16 pb-4">
          <div className="flex flex-col gap-4">
            <span>Data now available</span>

            <button type="button" onClick={() => navigate("/data-view")}>
              Go to data view
            </button>
          </div>
        </div>
      )}
    </>
  );
}
