import axios from "axios";

// 设置post请求的是请求头的Content-Type属性
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
// 基础请求路径，每次发请求就可以直接写相对请求路径
axios.defaults.baseURL = "https://note-server.hunger-valley.com/";
// 是否使用跨域请求
axios.defaults.withCredentials = true;

export default function request(url: string, type = "GET", data = {}) {
  return new Promise((resolve, reject) => {
    let option = {
      url,
      method: type,
      // 不满足200-300、400这个状态直接就catch
      ValidateStatus(status: number) {
        return (status >= 200 && status < 300) || status === 400;
      },
      params: {},
      data: {},
    };
    if (type.toLowerCase() === "get") {
      option.params = data;
    } else {
      option.data = data;
    }

    axios(option)
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data);
        } else {
          reject(res.data);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}
