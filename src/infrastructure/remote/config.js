export const API_CONFIG = {
  base: "https://sa3dni.herokuapp.com/api/",
};

export const API_ENDPOINTS = {
  login: "login",
  register: "register",
  registerAgent: "registerAgent",

  me: "me",
  user: "users/:id",
  users: "users",

  userRole: "users/role/:id",

  group: "groups/:id",
  groups: "groups",

  invitation: "invitations/:id",
  invitations: "invitations",
};

export const API_HEADERS = {
  language: "Language",
  authorization: "Authorization",
};
