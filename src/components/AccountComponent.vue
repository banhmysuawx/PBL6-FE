<template>
  <div class="account-user">
    <div class="account-detail">
      <h2 class="account-detail__text">ACCOUNT INFOMATION</h2>
      <Form class="frm">
        <FormItem name="email">
          <label for="email" class="account-detail__label">Email</label>
          <Input
            placeholder="Enter your email"
            readonly
            v-model:value="user.email"
          ></Input>
        </FormItem>
        <FormItem name="date">
          <label for="date" class="account-detail__label">Birthday</label>
          <DatePicker
            style="width: 280px; height: 40px; border: 1px s"
            show-time
            type="date"
            placeholder="Pick your birthday"
          />
        </FormItem>
        <FormItem name="gender">
          <label for="gender" class="account-detail__label">Gender</label>
          <Select
            name="gender"
            class="select-model"
            v-model:value="user.gender"
          >
            <SelectOption value="female">Female</SelectOption>
            <SelectOption value="male">Male</SelectOption>
            <SelectOption value="other">Other</SelectOption>
          </Select>
        </FormItem>
        <FormItem name="Role">
          <label for="Role" class="account-detail__label">Role</label>
          <Select name="role" class="select-model" v-model:value="user.role">
            <SelectOption value="admin">Admin</SelectOption>
            <SelectOption value="seeker">Seeker</SelectOption>
            <SelectOption value="employer">Employer</SelectOption>
          </Select>
        </FormItem>
        <FormItem>
          <div class="frm_btns">
            <span class="space"></span>
            <Button type="primary" htmlType="submit" class="btnLogin">
              OK
            </Button>
            <Button type="primary" htmlType="cancel" class="btnLogin">
              Cancel
            </Button>
          </div>
        </FormItem>
      </Form>
    </div>
    <div class="change-password">
      <h2 class="account-detail__text">CHANGE PASSWORD</h2>
      <Form class="frm" ref="form" @submit.prevent="changePassword">
        <FormItem name="old_password">
          <label for="old_password" class="account-detail__label"
            >Your Password</label
          >
          <InputPassword
            v-model:value="old_password"
            placeholder="Enter your Password"
          ></InputPassword>
        </FormItem>
        <FormItem name="new_password">
          <label for="new_password" class="account-detail__label"
            >New Password</label
          >
          <InputPassword
            v-model:value="new_password"
            placeholder="Enter your new password"
          ></InputPassword>
        </FormItem>
        <FormItem>
          <div class="frm_btns">
            <span class="space"></span>
            <Button type="primary" htmlType="submit" class="btnLogin">
              OK
            </Button>
            <Button type="primary" htmlType="cancel" class="btnLogin">
              Cancel
            </Button>
          </div>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import {
  Form,
  FormItem,
  Select,
  SelectOption,
  DatePicker,
  Input,
  InputPassword,
} from "ant-design-vue";
import axios from "axios";
import store from "../store";
export default defineComponent({
  name: "AccountComponent",
  data() {
    const user = store.state.user;
    return {
      old_password: "",
      new_password: "",
      user,
    };
  },
  components: {
    Form,
    FormItem,
    Select,
    SelectOption,
    DatePicker,
    Input,
    InputPassword,
  },
  methods: {
    async changePassword() {
      const accessToken = this.$store.state.accessToken;
      await axios
        .patch(
          "auth/change-password",
          {
            old_password: this.old_password,
            new_password: this.new_password,
          },
          {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          }
        )
        .then((response) => this.$message.success("success"))
        .catch((err) => this.$message.error(err));
    },
  },
});
</script>

<style scoped>
.account-user .ant-form label {
  padding-left: 26px;
  width: 30%;
  display: inline-block;
  text-align: right;
  padding-right: 2rem !important;
  font-size: 15px;
  font-family: Roboto, sans-serif;
  font-weight: 550;
  color: rgb(61, 60, 60);
}
.account-user .ant-form-item .ant-select {
  width: 280px;
  height: 40px;
}
.account-user form.ant-form.ant-form-horizontal.frm {
  border: 1px solid #e9e9e9;
  width: 90%;
  padding: 10px;
  padding-top: 20px;
  border-radius: 5px;
  box-shadow: 2px 2px 12px #e9e9e9;
}
.account-user .ant-row.ant-form-item .frm_btns {
  text-align: center;
}
.account-user .btnLogin {
  border: 0 !important;
}
.account-user button.btnLogin {
  font-size: 18px;
  text-align: center;
  padding: 2px;
  color: white;
  font-weight: 550;
  width: 27%;
  margin: 5px;
}
.account-user .account-detail__text {
  font-family: "Roboto", sans-serif;
  font-weight: 550;
  color: white;
  padding-top: 10px;
  background-image: linear-gradient(to right, #045c6a, #045c6a, #045c6a);
  border-radius: 6px;
  padding: 3px 6px;
  width: 90%;
  margin-top: 10px;
}
.account-user form.ant-form.ant-form-horizontal.frm {
  margin-bottom: 2rem;
  margin-top: 1rem;
}
</style>
