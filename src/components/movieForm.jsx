import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import withRouter from "./common/withRouter"; // Import the HOC

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    errors: {},
    genres: [],
  };
  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .integer()
      .min(0)
      .max(100)
      .required()
      .label("Number In Stock"),
    dailyRentalRate: Joi.number()
      .positive()
      .max(10)
      .required()
      .label("Daily Rental Rate"),
  };
  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }
  async populateMovie() {
    if (location.pathname === "/movies/new") return;
    try {
      const movieId = this.props.match.params.id;
      console.log("test", movieId);
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      // Log the error and handle invalid IDs
      console.log(
        "Error fetching movie:",
        ex.response ? ex.response.status : ex
      );

      // If it's a 404 (movie not found), or network error, redirect to NotFound
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace("/not-found");
      } else {
        // Handle other network errors (e.g., network timeout or reset)
        this.props.history.replace("/not-found");
      }
    }
  }
  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = async () => {
    try {
      await saveMovie(this.state.data);
      console.log("submitted:", this.state.data);
      this.props.history.push("/movies");
    } catch (ex) {
      console.log("Error while submitting: ", ex);
    }
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number In Stock", "number")}
          {this.renderInput("dailyRentalRate", "Daily Rental Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default withRouter(MovieForm);
