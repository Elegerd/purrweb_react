export const setData = (data) => {
  localStorage.setItem("trello_data", JSON.stringify(data));
};

export const getData = () => {
  return JSON.parse(localStorage.getItem("trello_data"));
};

export const setUser = (user) => {
  localStorage.setItem("trello_user", user);
};

export const getUser = () => {
  return localStorage.getItem("trello_user");
};

export const getNewId = (ids) => (ids.length > 0 ? Math.max(...ids) + 1 : 0);
