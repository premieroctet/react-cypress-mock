import React, { useReducer, useContext, useMemo } from "react";

const MovieContext = React.createContext();
const INITIAL_STATE = { movie: undefined, search: "", isLoading: false };

function reducer(state, action) {
  switch (action.type) {
    case "setMovie":
      return { ...state, movie: action.payload, isLoading: false };
    case "setSearch":
      return { ...state, search: action.payload };
    case "setLoading":
      return { ...state, isLoading: true };
    default:
      return state;
  }
}

function MovieProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const value = useMemo(() => {
    return { dispatch, state };
  }, [state]);

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
}

function useMovie() {
  return useContext(MovieContext);
}

export { MovieProvider, useMovie };
