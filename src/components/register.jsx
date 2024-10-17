import React from "react";
import Joi from "joi-browser";
import auth from "../services/authService";
import Form from "./common/form";
import * as userService from "../services/userService";
import withRouter from "./common/withRouter";

class Register extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: "",
    },
    errors: {},
  };
  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().required().label("Password").min(5),
    name: Joi.string().required().label("Name"),
  };
  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJWT(response.data.token);
      window.location = "/";
      // Handle successful registration (e.g., redirect to a login page)
    } catch (ex) {
      console.error("Error caught in catch block:", ex);
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data; // Adjust based on the actual response format
        this.setState({ errors });
      } else {
        // Handle other types of errors or unexpected errors
        console.error("Unexpected Error:", ex);
      }
    }
  };
  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default withRouter(Register);
