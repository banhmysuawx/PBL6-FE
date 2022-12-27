<template>
  <div class="home">
    <div class="container">
      <div class="account-header">
        <div class="total">{{ total }} accounts</div>
        <div class="filter-container">
          <div class="search-item">
            <a-input v-model:value="text"></a-input>
          </div>
          <div class="filter">
            <a-dropdown>
              <template #overlay>
                <a-menu v-model:value="role">
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
                <a-menu v-model:value="status">
                  <a-menu-item value="dissbled"> disable </a-menu-item>
                  <a-menu-item value="enabled"> enable </a-menu-item>
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
            <a-modal
              v-model:visible="visible"
              title="Add account"
              @ok="register"
            >
              <Form class="frm" ref="form">
                <FormItem name="email">
                  <Input
                    placeholder="Email"
                    v-model:value="newAcc.email"
                  ></Input>
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
      </div>
      <div class="account-container">
        <a-table
          :dataSource="dataSource"
          :columns="columns"
          :scroll="{ y: 460 }"
        >
          <template #role="{ text: role }">
            <span>
              <a-tag
                :key="role"
                :color="
                  role === 'admin'
                    ? 'volcano'
                    : role === 'employer'
                    ? 'geekblue'
                    : 'green'
                "
              >
                {{ role?.toUpperCase() }}
              </a-tag>
            </span>
          </template>
          <template #is_active="{ record }">
            <a-popconfirm
              :title="
                record.is_active == true
                  ? 'Your want to disable this account'
                  : 'Your want to enable this account'
              "
            >
              <span>
                <a-switch size="small" v-model:checked="record.is_active" />
              </span>
            </a-popconfirm>
          </template>
          <template #action="{ record }">
            <a-popconfirm v-if="dataSource.length" title="Sure to delete?">
              <a>Delete</a>
            </a-popconfirm>
          </template>
        </a-table>
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
import { AccountView } from "@/utils";
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
      dataSource: [],
      dataClone: [],
      total: 0,
      text: "",
      role: "",
      status: "disabled",

      columns: [
        {
          title: "Email",
          dataIndex: "email",
          className: "custome-column",
          key: "email",
          style: "text-align: center !important",
          width: "25%",
        },
        {
          title: "Role",
          dataIndex: "role",
          key: "role",
          className: "custome-column",
          slots: { customRender: "role" },
          width: "15%",
        },
        {
          title: "Created at",
          dataIndex: "created_at",
          className: "custome-column",
          key: "created_at",
        },
        {
          title: "Status",
          dataIndex: "is_active",
          key: "is_active",
          className: "custome-column",
          slots: { customRender: "is_active" },
          width: "15%",
        },
        {
          title: "Action",
          dataIndex: "action",
          key: "action",
          className: "custome-column",
          slots: { customRender: "action" },
          width: "15%",
        },
      ],
    };
  },
  mounted() {
    this.getListAcc();
  },
  watch: {
    text() {
      console.log(this.text);
      this.filterAcc(this.text, this.role, this.status);
    },
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
    async getListAcc() {
      const data = await axios
        .get("auth/admin/list-accounts")
        .then((response) => {
          const data = response.data;
          this.total = data.length;
          data.map((item: AccountView) =>
            this.dataSource.push({
              email: item.email,
              role: item.role,
              gender: item.gender,
              is_active: item.is_active.toLowerCase() === "true" ? true : false,
              created_at: item.created_at,
            })
          );
          this.dataClone = this.dataSource;
        })
        .catch(() => []);
    },
    async deleteAcc(id: Number) {
      await axios
        .delete("auth/admin/delete-accounts/" + id)
        .then(() => true)
        .catch(() => false);
    },
    async filterAcc(text: string, role?: string, status?: string) {
      this.dataSource = this.dataClone;
      if (text.length)
        this.dataSource = this.dataSource.filter((item: { email: string }) =>
          item.email.includes(text)
        );
      if (role && role != "all")
        this.dataSource = this.dataSource.filter(
          (item: { role: string }) => item.role === role
        );
      if (status && status != "all") {
        const is_active = status === "disabled" ? false : true;
        this.dataSource = this.dataSource.filter(
          (item: { is_active: boolean }) => item.is_active === is_active
        );
      }
    },
  },
});
</script>
<style scoped>
.container {
  background: white;
}
.account-header {
  display: flex;
  justify-content: space-between;
  margin: 50px 20px 30px 50px;
}
.account-header .total {
  margin-right: 20px;
  font-size: 17px;
  color: #007082;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  border: 1px solid #e9e9e9;
  border-radius: 5px;
  padding: 5px 10px;
}
.account-container {
  max-width: 1350px;
  margin: auto;
  margin-top: 20px;
}
.filter-container {
  display: flex;
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
.account-table thead.ant-table-thead {
  font-weight: 550 !important;
}
.total-account {
  text-align: left;
  padding-bottom: 10px;
  padding-left: 10px;
  font-size: 18px;
  font-family: Tahoma, sans-serif;
  color: rgb(188, 71, 108);
}
</style>
