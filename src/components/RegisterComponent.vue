<template>
  <div class="main-auth">
    <Card class="card">
      <div class="login-right">
        <img
          src="https://media.talentprise.com/blog/wp-content/uploads/2022/03/07183843/Job-Seeker4.svg"
          alt=""
        />
      </div>
      <div class="login-left">
        <div class="login-inner">
          <Row class="login-row">
            <Col class="register-text">
              <h2 class="create-account">Create Account</h2>
            </Col>
            <Col class="login-area">
              <div class="form-frm-internal">
                <Form
                  class="frm"
                  :model="model"
                  :rules="rules"
                  ref="form"
                  @submit.prevent="register"
                >
                  <FormItem name="email">
                    <Input
                      placeholder="Enter your email"
                      v-model:value="model.email"
                    ></Input>
                  </FormItem>
                  <FormItem name="password">
                    <InputPassword
                      placeholder="Enter your password"
                      v-model:value="model.password"
                    ></InputPassword>
                  </FormItem>
                  <FormItem name="password2">
                    <InputPassword
                      placeholder="Confirm Your Password"
                      v-model:value="model.password2"
                    ></InputPassword>
                  </FormItem>
                  <FormItem name="date">
                    <DatePicker
                      style="width: 280px; height: 40px; border: 1px s"
                      show-time
                      type="date"
                      placeholder="Pick your birthday"
                    />
                  </FormItem>
                  <FormItem name="gender">
                    <Select
                      name="gender"
                      v-model:value="model.gender"
                      @change="handleChange"
                      class="select-model"
                    >
                      <SelectOption value="female">Female</SelectOption>
                      <SelectOption value="male">Male</SelectOption>
                      <SelectOption value="other">Other</SelectOption>
                    </Select>
                  </FormItem>
                  <FormItem name="Role">
                    <Select
                      name="role"
                      v-model:value="model.role"
                      @change="handleChange"
                      class="select-model"
                    >
                      <SelectOption value="seeker">Seeker</SelectOption>
                      <SelectOption value="employer">Employer</SelectOption>
                    </Select>
                  </FormItem>
                  <FormItem>
                    <div class="frm_btns">
                      <span class="space"></span>
                      <Button type="primary" htmlType="submit" class="btnLogin">
                        Sign Up
                      </Button>
                    </div>
                  </FormItem>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup>
import {
  Row,
  Col,
  Form,
  FormItem,
  Input,
  DatePicker,
  InputPassword,
  Card,
  Select,
  SelectOption,
  Button,
} from "ant-design-vue";
</script>

<script>
import axios from "axios";
export default {
  name: "RegisterComponent",
  data() {
    return {
      model: {
        email: "",
        password: "",
        password2: "",
        date_of_birth: "2022-11-04",
        gender: "female",
        role: "seeker",
      },
      rules: {
        email: [
          {
            required: true,
            message: "Email is required",
            trigger: blur,
          },
        ],
        password: [
          {
            required: true,
            message: "Password is required",
            trigger: blur,
          },
        ],
        password2: [
          {
            required: true,
            message: "Confirm Password is required",
            trigger: blur,
          },
        ],
      },
    };
  },
  methods: {
    handleChange(value) {
      this.model.gender = value;
    },
    async register() {
      let valid = await this.$refs.form;
      console.log(this.model);
      if (!valid) {
        return;
      }
      await axios
        .post("auth/register", this.model)
        .then((response) => {
          const data = response.data;
          this.$route.push({ name: "login" });
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
.register-text .create-account {
  text-align: center;
  font-size: 30px;
  color: #007082;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
.ant-form-item {
  margin-bottom: 12px;
  font-size: 10px;
}
.ant-form-item .ant-select,
.ant-form-item .ant-cascader-picker {
  width: 280px;
  height: 40px !important;
}
.main-auth .card .login-left {
  top: 0% !important;
  padding-top: 0%;
}
</style>
