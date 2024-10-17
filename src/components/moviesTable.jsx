import React, { Component } from "react";
import Table from "./common/table";
import Like from "./common/like";
import { Link } from "react-router-dom";

class MoviesTable extends Component {
  genres = this.props.genres;
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    {
      path: "genreName",
      label: "Genre",
    },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movies, onSort, sortColumn, genres } = this.props;
    const moviesWithGenres = movies.map((movie) => {
      const genre = genres.find((g) => g._id === movie.genre);
      return { ...movie, genreName: genre ? genre.name : "Unknown" };
    });
    return (
      <div>
        <Table
          columns={this.columns}
          data={moviesWithGenres}
          sortColumn={sortColumn}
          onSort={onSort}
        />
      </div>
    );
  }
}

export default MoviesTable;
