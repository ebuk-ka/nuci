import API from "./api";

export const register = (data: {
  fullName: string;
  email: string;
  password: string;
}) => API.post("/register", data);

export const login = (data: {
  email: string;
  password: string;
}) => API.post("/login", data);