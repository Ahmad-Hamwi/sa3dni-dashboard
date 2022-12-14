export const API_CONFIG = {
  // base: "http://192.168.43.60:7001/api/"
  base: "https://sa3dni.herokuapp.com/api/",
  // base: "http://localhost:7001/api/",
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

  chats: "chats",
  chat: "chats/:id",
  chatMessages: "/chats/:id/messages",
  transfer: "/chats/:id/transfer",
  close: "/chats/:id/close",

  company: "/companies",

  chatReportsSatisfactions: "/reports/chats/satisfactions",
  chatReportsAvailabilities: "/reports/chats/availabilities",

  userReportsTopRated: "/reports/users/top",
  userPerformance: "/reports/users/:id/performance",

  userStatus: "/users/activity",
};

export const API_HEADERS = {
  language: "Language",
  authorization: "Authorization",
};
