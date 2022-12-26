<template>
  <div class="home">
    <div class="container">
      <div class="filter-container">
        <div class="search-item">
          <a-input></a-input>
        </div>
        <div class="filter">
          <a-dropdown>
            <template #overlay>
              <a-menu>
                <a-menu-item key="admin"> admin </a-menu-item>
                <a-menu-item key="employer"> employer </a-menu-item>
                <a-menu-item key="seeker"> seeker </a-menu-item>
              </a-menu>
            </template>
            <a-button>
              Role
              <CaretDownFilled />
            </a-button>
          </a-dropdown>
        </div>
        <div class="filter">
          <a-dropdown>
            <template #overlay>
              <a-menu>
                <a-menu-item key="dissble"> disable </a-menu-item>
                <a-menu-item key="enable"> enable </a-menu-item>
              </a-menu>
            </template>
            <a-button>
              Status
              <CaretDownFilled />
            </a-button>
          </a-dropdown>
        </div>
        <div class="action">
          <a-button class="filter-btn">Filter</a-button>
          <a-button class="filter-btn" @click="showModal">Add</a-button>
          <a-modal v-model:visible="visible" title="Add account" @ok="register">
            <Form class="frm" ref="form">
              <FormItem name="email">
                <Input placeholder="Email" v-model:value="newAcc.email"></Input>
              </FormItem>
              <FormItem name="password">
                <InputPassword
                  placeholder="Password"
                  v-model:value="newAcc.password"
                ></InputPassword>
              </FormItem>
              <FormItem name="password2">
                <InputPassword
                  placeholder="Confirm Password"
                  v-model:value="newAcc.password2"
                ></InputPassword>
              </FormItem>
              <FormItem name="date">
                <DatePicker
                  style="width: 280px; height: 40px; border: 1px s"
                  show-time
                  type="date"
                  placeholder="Completion Date"
                  v-model:value="newAcc.date_of_birth"
                  format="YYYY-MM-DD"
                />
              </FormItem>
              <FormItem name="gender">
                <Select
                  name="gender"
                  class="select-model"
                  v-model:value="newAcc.gender"
                >
                  <SelectOption value="female">Female</SelectOption>
                  <SelectOption value="male">Male</SelectOption>
                  <SelectOption value="other">Other</SelectOption>
                </Select>
              </FormItem>
              <FormItem name="Role">
                <Select
                  name="role"
                  class="select-model"
                  v-model:value="newAcc.role"
                >
                  <SelectOption value="seeker">Seeker</SelectOption>
                  <SelectOption value="employer">Employer</SelectOption>
                </Select>
              </FormItem>
            </Form>
          </a-modal>
        </div>
      </div>
      <div class="account-container">
        <TableUser />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import TableUser from "../../components/table/TableUser.vue";
import { UserOutlined, CaretDownFilled } from "@ant-design/icons-vue";
import { useMenu } from "../../store/use-menu";
import { Account, formatTime } from "../../utils";
import {
  Form,
  FormItem,
  Button,
  Input,
  InputPassword,
  Select,
  SelectOption,
  DatePicker,
} from "ant-design-vue";
import axios from "axios";
export default defineComponent({
  name: "AccountManagement",
  components: {
    TableUser,
    UserOutlined,
    CaretDownFilled,
    Form,
    FormItem,
    Button,
    Input,
    InputPassword,
    Select,
    SelectOption,
    DatePicker,
  },
  setup() {
    const store = useMenu();
    store.onSelectedKeys(["account-management"]);
    store.onOpenKeys(["account-management"]);
  },
  data() {
    const newAcc: Account = {
      email: "",
      password: "",
      password2: "",
      date_of_birth: "",
      role: "seeker",
      gender: "female",
    };
    return {
      visible: false,
      newAcc,
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleCancle() {
      this.visible = false;
    },
    async register() {
      let valid = await this.$refs.form;
      console.log(this.model);
      if (!valid) {
        return;
      }
      this.newAcc.date_of_birth = formatTime(this.newAcc.date_of_birth);
      await axios
        .post("auth/register", this.newAcc)
        .then((response) => {
          const data = response.data;
          this.visible = false;
        })
        .catch((error) => {
          this.$message.error("Please verify your email");
          this.visible = false;
        });
    },
  },
});
</script>
<style scoped>
.container {
  background: white;
}
.account-container {
  max-width: 1350px;
  margin: auto;
  margin-top: 20px;
}
.filter-container {
  display: flex;
  max-width: 1350px !important;
  margin: 30px auto;
  width: fit-content;
  margin-right: 0;
  margin-top: 50px;
}
.filter {
  padding-right: 20px;
}
.filter button.ant-btn.ant-dropdown-trigger {
  font-size: 14px;
  height: 35px;
  padding: 3px 10px;
  border-radius: 10px;
}
.filter span.anticon.anticon-caret-down {
  margin-left: 20px;
}
.span.anticon.anticon-caret-down {
  margin-right: 0;
}
.search-item {
  margin-right: 20px;
}
.search-item input.ant-input {
  width: 200px !important;
  height: 35px;
}
.filter-btn {
  margin-right: 20px;
  border-radius: 7px;
  background: #007082;
  color: white;
}
.account-container {
  padding: 0 40px;
}
.ant-form-item {
  margin-bottom: 12px;
  font-size: 10px;
}
.ant-form-item .ant-select,
.filter-container .ant-cascader-picker {
  width: 280px;
  height: 35px !important;
  border-radius: 7px;
}
.ant-form-item .ant-select-selector {
  border-radius: 7px;
}
</style>
