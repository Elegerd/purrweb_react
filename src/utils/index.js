const setData = (data) => {
  localStorage.setItem("trello_data", JSON.stringify(data));
};

const getData = () => {
  return JSON.parse(localStorage.getItem("trello_data"));
};

const setUser = (user) => {
  localStorage.setItem("trello_user", user);
};

const getUser = () => {
  return localStorage.getItem("trello_user");
};

const getNewId = (ids) => (ids.length > 0 ? Math.max(...ids) + 1 : 0);

module.exports = {
  setData,
  getData,
  setUser,
  getUser,
  getNewId,
};
