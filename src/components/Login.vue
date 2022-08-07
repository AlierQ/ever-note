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
                  <input type="text" placeholder="用户名" />
                  <input type="password" placeholder="密码" />
                  <span class="info">账号密码错误　</span>
                  <div class="button">登　录</div>
                  <div class="toggle">
                    没有账号？<span @click="toggle">去注册</span>
                  </div>
                </div>
              </div>
              <div v-else key="register" class="register-form">
                <h2>注册账号</h2>
                <div class="register">
                  <input type="text" placeholder="用户名" />
                  <input type="password" placeholder="密码" />
                  <span class="info">账号密码错误　</span>
                  <div class="button">注　册</div>
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

const state = ref(true);

const toggle = () => {
  state.value = !state.value;
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
        font-size: 14px;
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
        height: 16px;
        display: inline-block;
        margin-top: 5px;
        color: red;
        font-size: 12px;
        line-height: 16px;
      }
    }
  }
}
</style>
