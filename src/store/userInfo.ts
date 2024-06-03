import { defineStore } from "pinia";

// ! Setup Store
export const useUserInfoStore = defineStore("userInfo", {
  state: () => {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo") || "{}");
    const {
      id = "",
      username = "",
      age = "",
      code = "",
      address = "",
      phone = "",
    } = userInfo;

    return {
      id,
      username,
      age,
      code,
      address,
      phone,
    };
    // return {
    //   id,
    //   username,
    //   age,
    //   code,
    //   address,
    //   phone,
    // };
  },
});
