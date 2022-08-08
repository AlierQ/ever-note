<template>
  <div id="login">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="main"></div>
          <div class="form">
            <transition
              mode="out-in"
              name="fade"
              enter-active-class="animate__animated animate__bounceIn"
              leave-active-class="animate__animated animate__bounceOut"
            >
              <div v-if="state" key="login" class="login-form">
                <h2>用户登录</h2>
                <div class="login">
                  <input
                    v-model="login.username"
                    type="text"
                    placeholder="用户名"
                  />
                  <input
                    v-model="login.password"
                    type="password"
                    placeholder="密　码"
                  />
                  <span class="info" :class="{ error: login.isError }"
                    >{{ login.info }}　</span
                  >
                  <div class="button" @click="onLogin">登　录</div>
                  <div class="toggle">
                    没有账号？<span @click="toggle">去注册</span>
                  </div>
                </div>
              </div>
              <div v-else key="register" class="register-form">
                <h2>注册账号</h2>
                <div class="register">
                  <input
                    v-model="register.username"
                    type="text"
                    placeholder="用户名"
                  />
                  <input
                    v-model="register.password"
                    type="password"
                    placeholder="密　码"
                  />
                  <span class="info" :class="{ error: register.isError }"
                    >{{ register.info }}　</span
                  >
                  <div class="button" @click="onRegister">注　册</div>
                  <div class="toggle">
                    已有帐号？<span @click="toggle">去登陆</span>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Auth from "@/api/auth";

Auth.get_login_state().then((data) => {
  console.log(data);
});

const state = ref(true);

const login = ref({
  username: "",
  password: "",
  info: "输入用户名和密码",
  isError: false,
});

const register = ref({
  username: "",
  password: "",
  info: "注册账号后，请记住用户名和密码",
  isError: false,
});

const toggle = () => {
  state.value = !state.value;
};

const onRegister = () => {
  if (!/^[\w]{3,15}$/.test(register.value.username)) {
    register.value.isError = true;
    register.value.info = "用户名3~15个字符，仅限于字母数字下划线";
    return;
  }
  if (!/^.{6,16}$/.test(register.value.password)) {
    register.value.isError = true;
    register.value.info = "密码长度为6~16个字符";
    return;
  }
  register.value.isError = false;
  register.value.info = "";
  Auth.register({
    username: register.value.username,
    password: register.value.password,
  }).then((data) => {
    console.log(data);
  });
};
const onLogin = () => {
  if (!/^[\w]{3,15}$/.test(login.value.username)) {
    login.value.isError = true;
    login.value.info = "用户名3~15个字符，仅限于字母数字下划线";
    return;
  }
  if (!/^.{6,16}$/.test(login.value.password)) {
    login.value.isError = true;
    login.value.info = "密码长度为6~16个字符";
    return;
  }
  login.value.isError = false;
  login.value.info = "";

  Auth.login({
    username: login.value.username,
    password: login.value.password,
  })
    .then((data) => {
      // 重置提示信息
      login.value.isError = false;
      login.value.info = "";
      console.log(data);
    })
    .catch((err) => {
      // 设置错误提示信息
      login.value.isError = true;
      login.value.info = err.response.data.msg;
    });
};
</script>

<style scoped lang="less">
.modal-mask {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 800px;
  height: 394px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  display: flex;
  .main {
    flex: 1;
    background: url("@/assets/images/login&register.png") center center
      no-repeat;
    background-size: contain;
  }
  .form {
    width: 270px;
    border-left: 1px solid #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    .register-form,
    .login-form {
      width: 85%;
      h2 {
        color: #06a17e;
        text-align: center;
      }
    }

    .login,
    .register {
      input {
        display: block;
        width: 100%;
        height: 35px;
        line-height: 35px;
        padding: 0 6px;
        border-radius: 4px;
        border: 1px solid #ccc;
        outline: none;
        font-size: 16px;
        margin-top: 24px;
      }
      input:focus {
        border: 1px solid #06a17e;
      }
      .button {
        background-color: #06a17e;
        height: 36px;
        line-height: 36px;
        text-align: center;
        font-weight: bold;
        color: #fff;
        border-radius: 4px;
        margin-top: 8px;
        cursor: pointer;
      }
      .toggle {
        margin-top: 10px;
        text-align: center;
        font-size: 14px;
        span {
          cursor: pointer;
          color: #06a17e;
          transition: all 0.25s ease;

          &:hover {
            text-decoration: 2px underline #06a17e;
          }
        }
      }
      .info {
        color: #06a17e;
        height: 16px;
        display: inline-block;
        margin-top: 5px;
        font-size: 12px;
        line-height: 16px;
        &.error {
          color: red;
        }
      }
    }
  }
}
</style>
