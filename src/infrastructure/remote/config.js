export const API_CONFIG = {
  base: "https://sa3dni.herokuapp.com/api/",
};

export const API_ENDPOINTS = {
  login: "login",
  register: "register",

  me: "me",
  user: "users/:id",
  users: "users",
  deleteUser: "users/:id",
  changeUserRole: "users/role/:id",
};

export const API_HEADERS = {
  language: "Language",
  authorization: "Authorization",
};
