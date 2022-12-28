<template>
  <div class="sidebar">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      style="
        position: relative;
        top: 64px;
        background-color: #f9f8f8;
        color: black;
        padding-top: 10px;
      "
      :collapse="isCollapse"
    >
      <el-menu-item
        style="
          min-height: 80px;
          padding-top: 0.3rem !important;
          border-bottom: 1px solid #e9e9e9;
        "
      >
        <div class="layout-user">
          <UserOutlined />
          <div class="layout-account">
            <span class="user-name"
              ><a href="">{{ username }}</a></span
            >
            <span class="user-role">{{ role }}</span>
            <span class="user-role user-company">{{ company_name }}</span>
          </div>
        </div>
      </el-menu-item>
      <el-menu-item index="0" @click="Dashboard()">
        <el-icon><location /></el-icon>
        <span>Dashboard</span>
      </el-menu-item>

      <el-menu-item index="1" @click="Jobboard()">
        <el-icon><location /></el-icon>
        <span>Job Board</span>
      </el-menu-item>

      <el-menu-item index="2" @click="JobManagement()">
        <el-icon><location /></el-icon>
        <span>Job Management</span>
      </el-menu-item>

      <el-menu-item index="11" @click="LocationManagement()">
        <el-icon><setting /></el-icon>
        <span>Location Management</span>
      </el-menu-item>

      <el-menu-item index="3" @click="InterviewCalendar()">
        <el-icon><Sunny /></el-icon>
        <span>Interview Calendar</span>
      </el-menu-item>

      <el-menu-item index="4" @click="TestManagement()">
        <el-icon><Document /></el-icon>
        <span><span class="content-menu-item">Test Management</span></span>
      </el-menu-item>

      <el-menu-item index="5" @click="CandidateManagement()">
        <el-icon><User /></el-icon>
        <span>Candidate Management</span>
      </el-menu-item>

      <el-menu-item index="6" @click="Information()">
        <el-icon><Calendar /></el-icon>
        <span>Information</span>
      </el-menu-item>

      <el-menu-item index="8" @click="UserView()">
        <el-icon><setting /></el-icon>
        <span>User View</span>
      </el-menu-item>
      <div style="text-align: right">
        <div v-if="isCollapse == true" style="">
          <el-button @click="changeCollapse()">
            <el-icon><Expand /></el-icon
          ></el-button>
        </div>
        <div v-else>
          <el-button @click="changeCollapse()" type="primary"
            ><el-icon><Fold /></el-icon
          ></el-button>
        </div>
      </div>
    </el-menu>
  </div>
  <router-view />
</template>

<script>
import { UserOutlined } from "@ant-design/icons-vue";
import store from "../store";
export default {
  name: "SideBar",
  data() {
    return {
      isCollapse: false,
      username: store.state.user.username,
      company_name: store.state.company.name,
      role: store.state.user.role,
    };
  },
  components: {
    UserOutlined,
  },
  methods: {
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    Dashboard() {
      this.$router.push({ name: "company-dashboard" });
    },
    Jobboard() {
      this.$router.push({ name: "JobBoard" });
    },
    JobManagement() {
      this.$router.push({ name: "company-job" });
    },
    LocationManagement() {
      this.$router.push({ name: "company-location" });
    },
    InterviewCalendar() {
      this.$router.push({ name: "Interview" });
    },
    CandidateManagement() {
      this.$router.push({ name: "Candidate" });
    },
    TestManagement() {
      this.$router.push({ name: "company-quizz" });
    },
    Information() {
      this.$router.push({ name: "company-information" });
    },
    UserView() {
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style lang="scss">
.el-menu-vertical-demo {
  width: 280px;
  height: 1000px;
  position: relative;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
}
.el-menu-vertical-demo
  ul.el-menu.el-menu--vertical.el-menu-vertical-demo.v-enter-to {
  position: relative;
  top: 64px;
  background-color: #f9f8f8;
}
.layout-user {
  display: flex;
}
.layout-user li.ant-menu-item,
.layout-user span.ant-menu-title-content {
  min-height: 64px;
  padding-top: 0.3rem !important;
  border-bottom: 1px solid #e9e9e9;
}

.layout-user span.anticon.anticon-user {
  margin-right: 15px;
  margin: auto;
}
hr {
  border-top: 1px solid #e9e9e9;
}
.layout-account {
  padding: 12px 0;
  text-align: left;
  padding-left: 5px;
}
.layout-account span.user-name {
  line-height: 17px;
  display: block;
}
.layout-account a {
  font-weight: 550;
  color: black !important;
}
.layout-account span.user-role {
  line-height: 17px;
  font-size: 12px;
  display: block;
}
.layout-account span.user-role.user-company {
  color: rgb(188, 71, 108);
  font-weight: 550;
}
.sidebar
  ul.el-menu.el-menu--vertical.el-menu--collapse.el-menu-vertical-demo.v-enter-to
  .layout-account {
  display: none;
}
</style>
