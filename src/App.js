import React from "react";
import SearchInput from "./components/SearchInput";
import MovieCard from "./components/MovieCard";
import { MovieProvider } from "./contexts/movie-context";
import Grid from "@material-ui/core/Grid";

const App = () => {
  return (
    <MovieProvider>
      <Grid container spacing={16}>
        <Grid item>
          <SearchInput />
        </Grid>
        <Grid item>
          <MovieCard />
        </Grid>
      </Grid>
    </MovieProvider>
  );
};

export default App;
