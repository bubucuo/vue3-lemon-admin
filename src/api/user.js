import http from "../utils/http.js";

const login = (data) => {
  return http.post("/login", data);
};

const authDemo = (data) => {
  return http.get("/authDemo", data);
};

// 获取用户列表
// pageNo=1&pageSize=10
const getUserList = (data) => {
  return http.get("/user/list", data);
};

const addUser = (data) => {
  return http.post("/user/add", data);
};

// 删除
const delUser = (data) => {
  // return http.del("/user/delete", data);
  return http.post("/user/delete", data);
};

// 获取用户信息 name=?
const getUserDetail = (data) => {
  return http.get("/user/get", data);
};

const updateUserInfo = (data) => {
  return http.post("/user/update", data);
};

export default {
  login,
  authDemo,
  getUserList,
  addUser,
  delUser,
  getUserDetail,
  updateUserInfo,
};
