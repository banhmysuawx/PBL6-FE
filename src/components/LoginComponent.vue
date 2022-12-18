<template>
  <div class="main-auth">
    <div class="login-right">
      <img src="../assets/Job-Seeker4.svg" alt="" />
    </div>
    <!-- <hr class="veritcal" /> -->
    <div class="login-left">
      <div class="login-inner">
        <!-- <Card class="login-card"> -->
        <Row class="login-row">
          <Col class="login-top-menu">
            <img src="../assets/logo2.png" alt="Logo" />
          </Col>
          <Col class="login-area">
            <div class="form-frm-internal">
              <Form
                class="frm"
                layout="vertical"
                :model="model"
                :rules="rules"
                ref="form"
                @submit.prevent="login"
              >
                <FormItem name="email">
                  <Input
                    v-model:value="model.email"
                    placeholder="Email"
                  ></Input>
                </FormItem>
                <FormItem name="password">
                  <InputPassword
                    v-model:value="model.password"
                    placeholder="Password"
                  ></InputPassword>
                </FormItem>
                <div class="notification" v-if="errors.length">
                  <a-alert
                    v-for="error in errors"
                    :key="error"
                    v-bind:message="error"
                    type="error"
                  />
                </div>
                <FormItem>
                  <a href="/register" name="forgot-password-text"
                    >Register now</a
                  >
                </FormItem>
                <FormItem>
                  <div class="frm_btns">
                    <span class="space"></span>
                    <Button type="primary" htmlType="submit" class="btnLogin">
                      Login
                    </Button>
                  </div>
                </FormItem>
              </Form>
            </div>
          </Col>
        </Row>
        <!-- </Card> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Row,
  Col,
  Form,
  FormItem,
  Input,
  Button,
  InputPassword,
} from "ant-design-vue";
</script>

<script lang="ts">
import axios from "axios";
export default {
  name: "LoginComponent",
  data() {
    return {
      errors: [],
      model: {
        email: "",
        password: "",
      },
      rules: {
        email: [
          {
            required: true,
            message: "Email is required",
            trigger: blur,
          },
          {
            min: 5,
            message: "Email length should be at least 5",
            trigger: blur,
          },
        ],
        password: [
          {
            required: true,
            message: "Password is required",
            trigger: blur,
          },
          {
            min: 0,
            message: "Password length should be at least 5",
            trigger: blur,
          },
        ],
      },
    };
  },
  methods: {
    async login() {
      this.errors = [];
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (this.model.email.length <= 5)
        return this.errors.push("Email format is incorrect");
      if (this.model.password.length <= 5)
        return this.errors.push("Password format is incorrect");
      if (!this.model.email.match(mailformat))
        return this.errors.push("Email is invalid");
      await axios
        .post("auth/login", this.model)
        .then(async (response) => {
          const accessToken = response.data.tokens.access;
          localStorage.setItem("accessToken", accessToken);
          this.$store.commit("setAccessToken", accessToken);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
          await this.getInfo();
          this.$router.push({ name: "home" });
        })
        .catch((error) => {
          console.log(error);
          this.$message.error("Username or password is incorrect");
        });
    },
    async getInfo() {
      await axios
        .get("auth/me")
        .then((response) => {
          const user = {
            id: response.data.id,
            username: response.data.username,
            role: response.data.role,
          };
          this.$store.commit("setUser", user);
          localStorage.setItem("id", user.id);
          localStorage.setItem("username", user.username);
          localStorage.setItem("role", user.role);
        })
        .catch((error) => error);
    },
  },
};
</script>

<style scoped>
@import "../assets/css/login.css";
.main-auth .notification {
  width: fit-content;
  text-align: center;
  margin: auto;
}
.notification .ant-alert.ant-alert-error.ant-alert-no-icon {
  border-radius: 7px;
}
</style>
