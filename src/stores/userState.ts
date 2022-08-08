// Pinia 管理用户登录状态
import { defineStore } from "pinia";
export const useUserStateStore = defineStore("userState", {
  state: () => {
    return {
      userState: {
        isLogin: false,
        data: {
          username: "",
          createAt: "",
          updatedAt: "",
        },
      },
    };
  },
  actions: {
    setUserState(userState: any) {
      this.userState = userState;
    },
    init() {
      this.userState = {
        isLogin: false,
        data: {
          username: "",
          createAt: "",
          updatedAt: "",
        },
      };
    },
  },
});
