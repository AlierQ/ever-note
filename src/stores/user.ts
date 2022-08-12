import { defineStore } from "pinia";
import Auth from "@/api/auth";
export const useUserStore = defineStore("user", {
  state: () => {
    return {
      user: {} as any,
      slug: "",
    };
  },
  actions: {
    getUser() {
      Auth.get_login_state().then((res: any) => {
        this.setUser(res.data);
        if (this.user) {
          this.slug = this.user.username.slice(0, 1);
        } else {
          this.slug = "";
        }
      });
    },
    setUser(user: any) {
      this.user = user;
    },
    loginUser({ username, password }: { username: string; password: string }) {
      return Auth.login({
        username: username,
        password: password,
      });
    },
    registerUser({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) {
      return Auth.register({
        username: username,
        password: password,
      });
    },
    logout() {
      this.slug = "";
      return Auth.logout();
    },
  },
});
