// 生成随机身份证号
export function getIdCard() {
  return Math.floor(Math.random() * Math.pow(10, 18));
}

export function getMobile() {
  return "1" + Math.floor(Math.random() * Math.pow(10, 10));
}

export const getToken = () => {
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo") || "{}");
  return userInfo.access_token; // ? Math.floor(Math.random() * 10) : null; // userInfo.token;
};
