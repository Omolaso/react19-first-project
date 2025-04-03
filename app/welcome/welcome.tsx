// import { ACTIONS } from "constants/reducerFunc";
// import { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router";
// import { FetchedDataContext, type FetchedDataContextProps } from "~/root";

import { useState, type ChangeEvent, type SyntheticEvent } from "react";

export function Welcome() {
  const [textValue, setTextValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  // const [passwordError, setPasswordError] = useState<boolean>(false);
  const [togglePassword, setToggelPassword] = useState<boolean>(false);

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setTextValue(value);
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setPasswordValue(value);
  };
  // const { state, dispatch } = useContext(
  //   FetchedDataContext
  // ) as FetchedDataContextProps;
  // const navigate = useNavigate();

  // useEffect(() => {
  //   let ignore = false;

  //   const fetchDataAsync = async () => {
  //     dispatch({ type: ACTIONS.IS_LOADING, payload: true });

  //     try {
  //       const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  //       const data = await res.json();
  //       dispatch({ type: ACTIONS.GET_DATA, payload: data });
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       dispatch({ type: ACTIONS.IS_LOADING, payload: false });
  //     }
  //   };

  //   fetchDataAsync();

  //   return () => {
  //     ignore = true;
  //   };
  // }, []);

  const handleSubmitForm = (e: SyntheticEvent) => {
    e.preventDefault();

    // const validatePass;

    const payload = {
      name: textValue,
      passwordValue: passwordValue,
    };

    console.log(payload);
  };

  return (
    // <>
    //   {state.isLoading ? (
    //     <span className="text-white">Loading...</span>
    //   ) : (
    //     <div className="flex items-center justify-center pt-16 pb-4">
    //       <div className="flex flex-col gap-4">
    //         <span>Data now available</span>

    //         <button type="button" onClick={() => navigate("/data-view")}>
    //           Go to data view
    //         </button>
    //       </div>
    //     </div>
    //   )}
    // </>
    <main className="flex items-center justify-center min-h-screen w-full">
      <form
        onSubmit={(e) => handleSubmitForm(e)}
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          value={textValue}
          onChange={(e) => handleChangeText(e)}
          className="p-2 bg-white text-black"
        />

        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <input
              type={togglePassword ? "text" : "password"}
              value={passwordValue}
              pattern={"^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$"}
              onChange={(e) => handleChangePassword(e)}
              className="p-2 bg-white text-black"
            />

            <button
              type="button"
              onClick={() => setToggelPassword(!togglePassword)}
            >
              {togglePassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* {passwordError && (
            <span className="text-red-800">
              Password must contain one capital, one special character and one
              number
            </span>
          )} */}
        </div>

        <button type="submit" className="">
          Submit
        </button>
      </form>
    </main>
  );
}
