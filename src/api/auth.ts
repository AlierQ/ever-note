import request from "@/helpers/request";

const URL = {
  REGISTER: "/auth/register",
  LOGIN: "auth/login",
  LOGOUT: "auth/logout",
  GET_LOGIN_STATE: "/auth",
};

export default {
  register({ username, password }: { username: string; password: string }) {
    return request(URL.REGISTER, "POST", { username, password });
  },

  login({ username, password }: { username: string; password: string }) {
    return request(URL.LOGIN, "POST", { username, password });
  },
  logout() {
    return request(URL.LOGOUT);
  },
  get_login_state() {
    return request(URL.GET_LOGIN_STATE);
  },
};
