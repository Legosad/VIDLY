import http from "./httpService";
import config from "../config.json";
const apiEndPoint = config.apiUrl + "/users";

export function register(user) {
  return http.post(apiEndPoint, {
    username: user.username,
    password: user.password,
    name: user.name,
  });
}
