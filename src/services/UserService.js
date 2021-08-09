import http from "../http-common.js";

const getAll = () => {
  return http.get("/users");
};

const getByAddress = id => {
  
  return http.get(`/users/address/${id}`);
};

const getByName = id => {
  return http.get(`/users/name/${id}`);
};

const create = data => {
  return http.post("/users", data);
};

const update = (id, data) => {
  return http.put(`/users/address/${id}`, data);
};

const remove = id => {
  return http.delete(`/users/${id}`);
};

const removeAll = () => {
  return http.delete(`/users`);
};

const findByAddress = title => {
  return http.get(`/users?userAddress=${title}`);
};

export default {
  getAll,
  getByAddress,
  getByName,
  create,
  update,
  remove,
  removeAll,
  findByAddress
} ;