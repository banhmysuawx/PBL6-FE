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
        </div>
      </div>
      <div class="account-container">
        <div class="total-account">Total: 10</div>
        <TableUser />
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import TableUser from "../../components/table/TableUser.vue";
import { UserOutlined, CaretDownFilled } from "@ant-design/icons-vue";
import { useMenu } from "../../store/use-menu";

export default defineComponent({
  name: "AccountManagement",
  components: {
    TableUser,
    UserOutlined,
    CaretDownFilled,
  },
  setup() {
    const store = useMenu();
    store.onSelectedKeys(["account-management"]);
    store.onOpenKeys(["account-management"]);
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
.total-account {
  text-align: left;
  padding-bottom: 10px;
  padding-left: 10px;
  font-size: 18px;
  font-family: Tahoma, sans-serif;
  color: rgb(188, 71, 108);
}
</style>
