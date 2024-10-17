import { jwtDecode } from "jwt-decode";
import http from "./httpService";
import config from "../config.json";
const apiEndPoint = config.apiUrl + "/auth";

const tokenKey = "token";
export async function login(username, password) {
  const { data: jwt } = await http.post(apiEndPoint, { username, password });
  localStorage.setItem(tokenKey, jwt.token);
}
export async function loginWithJWT(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getUser() {
  try {
    const token = localStorage.getItem(tokenKey);
    return jwtDecode(token);
  } catch (ex) {
    return null;
  }
}

export default {
  login,
  logout,
  getUser,
  loginWithJWT,
};
