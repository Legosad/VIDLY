import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
import NotFound from "./components/notFound";
import Customers from "./components/customer";
import Rentals from "./components/rentals";
import NavBar from "./components/navBar";
import MovieForm from "./components/movieForm";
import Login from "./components/login";
import Register from "./components/register";
import Logout from "./components/logout";
import auth from "./services/authService";
// import ProtectedRoute from "./components/common/protectedRoute";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Routes>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
            <Route path="/movies/new" element={<MovieForm />}></Route>
            <Route path="/movies/:id" element={<MovieForm />}></Route>
            <Route path="/movies" element={<Movies />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/rentals" element={<Rentals />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="/" element={<Navigate to={"/movies"} />} />
            <Route path="/*" element={<Navigate to={"/not-found"} />} />
          </Routes>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
