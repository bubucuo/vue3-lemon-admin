import { defineStore } from "pinia";

// ! Setup Store
export const useUserInfoStore = defineStore("userInfo", {
  state: () => {
    return {
      id: "",
      username: "",
      age: "",
      code: "",
      address: "",
      phone: "",
    };
  },
});
