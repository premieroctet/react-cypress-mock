import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useMovie } from "../contexts/movie-context";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  media: {
    height: 0,
    backgroundPosition: "top",
    paddingTop: "100%"
  },
  error: {
    paddingTop: 12
  }
};

function MovieCard(props) {
  const { classes } = props;
  const { state } = useMovie();
  const { isLoading, movie } = state;

  return (
    <React.Fragment>
      {isLoading && <CircularProgress />}
      {!isLoading && movie && (
        <Card className={classes.card}>
          <CardMedia className={classes.media} image={state.movie.Poster} />
          <CardContent>
            <Typography data-testid="movie-title" variant="h5" component="h2">
              {movie.Title}
            </Typography>
            <Typography
              data-testid="movie-year"
              className={classes.pos}
              color="textSecondary"
            >
              {movie.Year}
            </Typography>
          </CardContent>
        </Card>
      )}
      {!isLoading && movie === null && (
        <div className={classes.error}>
          Aucun film{" "}
          <span role="img" aria-label="Triste">
            😞
          </span>
        </div>
      )}
    </React.Fragment>
  );
}

MovieCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MovieCard);
