import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { useMovie } from "../contexts/movie-context";

const styles = {
  input: {
    marginLeft: 8,
    flex: 1
  }
};

const SearchInput = props => {
  const { classes } = props;
  const { state, dispatch } = useMovie();

  const handleOnChange = e =>
    dispatch({ type: "setSearch", payload: e.currentTarget.value });

  const handleOnClick = async () => {
    dispatch({
      type: "setLoading"
    });

    const response = await fetch(
      `https://www.omdbapi.com/?apikey=4d7c0bd5&s=${state.search}`
    ).then(response => response.json());

    dispatch({
      type: "setMovie",
      payload: response.Search ? response.Search[0] : null
    });
  };

  return (
    <Paper elevation={1}>
      <IconButton aria-label="Menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        data-testid="input-search"
        value={state.search}
        onChange={handleOnChange}
        onKeyPress={e => {
          if (e.key === "Enter") {
            handleOnClick();
          }
        }}
        className={classes.input}
        placeholder="Search Movies 🍿"
      />
      <IconButton
        data-testid="button-search"
        onClick={handleOnClick}
        aria-label="Search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

SearchInput.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchInput);
