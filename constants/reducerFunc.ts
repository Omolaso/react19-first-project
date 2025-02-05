export interface DataProps {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface ActionProps {
  type: string;
  payload?: any;
}

export interface InitialStateProps {
  isLoading: boolean;
  fetchedData: DataProps[];
}

export const ACTIONS = {
  GET_DATA: "getData",
  IS_LOADING: "setLoading",
};

export const initialState: InitialStateProps = {
  isLoading: false,
  fetchedData: [],
};

export const reducer = (state: InitialStateProps, action: ActionProps) => {
  switch (action.type) {
    case "setLoading": {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case "getData": {
      return {
        ...state,
        fetchedData: action.payload,
      };
    }

    default:
      throw Error("Unknown action");
  }
};
