import API from "./api";

export const getCurrentUser = () => {
  return API.get("/me");
};