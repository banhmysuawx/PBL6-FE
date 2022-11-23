<template>
  <div class="main-auth">
    <div class="login-right">
      <img
        src="https://media.talentprise.com/blog/wp-content/uploads/2022/03/07183843/Job-Seeker4.svg"
        alt=""
      />
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
                <FormItem>
                  <a href="#" name="forgot-password-text">Forgot Password</a>
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

<script setup>
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

<script>
import axios from "axios";
export default {
  name: "LoginComponent",
  data() {
    return {
      validCredentials: {
        email: "lightscope",
        password: "lightscope",
      },
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
            message: "Password length should be at least 8",
            trigger: blur,
          },
        ],
      },
    };
  },
  methods: {
    async login() {
      let valid = await this.$refs.form;
      if (!valid) {
        return;
      }
      await axios
        .post("https://api.quangdinh.me/auth/login", this.model)
        .then((response) => {
          const accessToken = response.data.tokens.access;
          this.$router.push({ name: "home" });
        })
        .catch((error) => {
          console.log(error);
          this.$message.error("Username or password is incorrect");
        });
    },
  },
};
</script>

<style scoped>
@import "../assets/css/login.css";
</style>
