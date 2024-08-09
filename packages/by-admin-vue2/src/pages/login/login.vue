<template>
  <div>
    <div class="app">
      <div class="icon">
        <!--          <img :src="logoUrl"/>-->
        <img src="@/assets/login/icon2.png"/>
      </div>
      <div class="login-container">
        <div class="left">
          <img src="@/assets/login/mainLogo.gif"/>
        </div>
        <div class="right">
          <div class="title">欢迎登录</div>
          <div class="sub-title">Welcome to Login</div>
          <el-form size="large">
            <el-form-item>
              <el-input placeholder="工号">
                <template #prefix>
                  <img src="@/assets/login/icon-username.png" alt="" width="17">
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="密码">
                <template #prefix>
                  <img src="@/assets/login/icon-password.png" alt="" width="17">
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <div class="flex">
                <el-input v-model="form.captchaText" class="mr-50" style="width: 100px;" placeholder="验证码">
                </el-input>
                <div style="background-color:red; height: 50px; width: 150px; zoom: 0.8;" v-html="captcha"></div>
                &nbsp;
                <el-button type="text" @click="handleChangeCaptcha">看不清, 换一张</el-button>
              </div>
            </el-form-item>
            <el-button @click="handleToLogin">立即登录</el-button>
          </el-form>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {getCaptcha} from "@/api/captcha";
import * as authApi from '@/api/auth';

export default {
  components: {},

  props: {},

  data() {
    return {
      // logoUrl: require('@/assets/icon1.png')
      captcha: '',
      captchaId: '',

      form: {
        username: '',
        password: '',
        captchaText: ''
      }
    };
  },

  computed: {},

  methods: {
    async handleChangeCaptcha() {
      let {data: {captcha, captchaId}} = await getCaptcha()
      this.captcha = captcha
      this.captchaId = captchaId
    },

    async handleToLogin() {
      let params = {
        username: 'asd',
        password: 'asd',
        captchaId: this.captchaId,
        captchaText: this.form.captchaText
      }
      let res = await authApi.login(params)
      console.log(res)
    }
  },

  async mounted() {
    await this.handleChangeCaptcha()
  },

  watch: {},
};
</script>

<style lang="scss" scoped>

.app {
  height: 100vh;
  width: 100vw;
  background-image: url("@/assets/login/bodyBg.png");
  background-size: cover; // ?
  display: flex;
  justify-content: center;
  align-items: center;

  > .icon {
    position: fixed;
    top: 41px;
    left: 56px;

    > img {
      width: 352px;
    }
  }

  > .login-container {
    width: 1080px;
    height: 600px;
    background-image: url("@/assets/login/containerBg.png");
    position: relative;
    background-size: cover;
    box-sizing: border-box;
    padding: 40px;
    display: flex;

    > .left {
      width: 50%;
      height: 100%;

      img {
        width: 500px;
        height: 500px;
        position: absolute;
        left: 88px;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    > .right {
      //border: 1px solid red;
      box-sizing: border-box;
      width: 50%;
      padding-left: 70px;
      padding-right: 70px;
      padding-top: 86px;

      .title {
        color: #333;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-size: 36px;
        font-weight: 600;
        line-height: 50px;
        text-align: left;
      }

      .sub-title {
        color: #999;
        font-family: PingFangSC-Regular, PingFang SC;
        font-size: 20px;
        font-weight: 400;
        margin-bottom: 34px;
        margin-top: 4px;
        text-align: left;
      }
    }
  }


}

.el-input__prefix {
  position: relative;

  img {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
}

</style>

