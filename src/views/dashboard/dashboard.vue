<template>
  <div>
    <el-container class="layout-container-demo">
      <SideBar />
      <el-container>
        <el-header style="height: 80px; background: #007082; padding: 0"
          ><HeaderCompanyView
        /></el-header>
        <el-main>
          <div class="main-container">
            <el-row>
              <el-col :span="1"></el-col>
              <el-col :span="8" style="font-size: 25px" class="name"
                >Welcome, Hoang Dung</el-col
              >
            </el-row>
            <div class="card-container">
              <div class="card-info">
                <div class="card-info-header">Applicants</div>
                <div class="card-info-content">
                  <FileTextFilled />
                  <div>
                    <span>{{ applicants.length }} </span>
                  </div>
                </div>
              </div>
              <div class="card-info">
                <div class="card-info-header">Jobs</div>
                <div class="card-info-content">
                  <BulbFilled />
                  <div>
                    <span>{{ jobs.length }} </span>
                  </div>
                </div>
              </div>
              <div class="card-info">
                <div class="card-info-header">Candidate</div>
                <div class="card-info-content">
                  <UserOutlined />
                  <div>
                    <span>{{ candidates.length }} </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import HeaderCompanyView from "@/components/HeaderCompany.vue";
import axios from "axios";
import {
  FileTextFilled,
  BulbFilled,
  UserOutlined,
} from "@ant-design/icons-vue";
export default {
  name: "Dashboard",

  data() {
    return {
      jobs: [],
      applicants: [],
      candidates: [],
    };
  },
  components: {
    SideBar,
    HeaderCompanyView,
    FileTextFilled,
    BulbFilled,
    UserOutlined,
  },
  created() {
    const id = this.$store.state.company.id;
    axios
      .get(`/jobs/company/get_jobs?company_id=${id}`)
      .then((res) => {
        this.jobs = res.data;
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`/applicants/company/get_all_applicants?company_id=${id}`)
      .then((res) => {
        this.applicants = res.data;
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`/applicants/company/get_all_candidate?company_id=${id}`)
      .then((res) => {
        this.candidates = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="scss">
@import "index.scss";
.card-container {
  display: flex;
  justify-content: space-between;
  margin: 0 20px;
}
.card-info {
  border: 1px solid #e9e9e9;
  width: 32%;
  background: white;
  border-radius: 7px;
  box-shadow: 2px 4px 4px rgb(33 47 63 / 10%);
}
.card-info .card-info-header {
  font-size: 27px;
  font-weight: 550;
  background: #088295;
  color: white;
  padding: 15px;
  border-radius: 8px;
}
.card-info span.anticon {
  font-size: 100px;
}
.card-info-content {
  padding: 30px;
}
.card-info-content div {
  padding-top: 20px;
  font-size: 50px;
  font-weight: 550;
  color: #2c3e50;
  padding-bottom: 20px;
}
.el-col.el-col-8.name {
  font-size: 30px !important;
  font-weight: 550;
  margin: 20px auto;
}
</style>
