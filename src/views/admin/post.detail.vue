<template>
  <div class="list-job">
    <div class="container">
      <div class="list-job-content">
        <div class="list-job-wrapper">
          <div class="list-job-info-box">
            <div class="job-detail-box__content">
              <div class="job-name">
                {{ jobDetail.name }}
                <div class="company">{{ jobDetail.company?.company_name }}</div>
              </div>
              <div class="job-detail-box__description">
                <div class="tag">
                  <p v-for="skill in jobDetail.skills">{{ skill.name }}</p>
                </div>
                <div class="salary">
                  <DollarOutlined />
                  <p>{{ jobDetail.salary }}</p>
                </div>
                <div class="info">
                  <WifiOutlined />
                  <p>
                    {{
                      jobDetail.locations
                        ?.map((item) => item.location_name)
                        .join(", ")
                    }}
                  </p>
                </div>
                <div class="info">
                  <PhoneOutlined />
                  <p>0935125585</p>
                </div>
                <div class="info">
                  <ContactsOutlined />
                  <p>1d</p>
                </div>
                <div class="divider"></div>
                <div class="job-description">
                  <h2>Job Description</h2>
                  <ul>
                    <li>{{ jobDetail.description }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="job-detail-box">
            <div class="job-detail-box__content">
              <div class="company-introduce">
                <div class="company-introduce__logo">
                  <div class="company-introduce__logo__img">
                    <img v-bind:src="jobDetail.company?.image" alt="" />
                  </div>
                </div>
                <div class="company-introduce__info">
                  <h1 class="company-introduce__info__name">
                    <!-- {{ company_detail.company_name }} -->
                    {{ jobDetail.company?.company_name }}
                  </h1>
                  <div class="company-introduce__info__item">
                    <div class="info-item">
                      <WifiOutlined />
                      <div class="info-item__text">
                        <!-- {{ company_detail.company_location }} -->
                        {{ jobDetail.company?.company_location }}
                      </div>
                    </div>

                    <div class="info-item">
                      <MailFilled />
                      <div class="info-item__text">20/12/2022</div>
                    </div>
                    <div class="info-item">
                      <PhoneFilled />
                      <div class="info-item__text">0935125585</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="job-opportunities">
                <div class="job-opportunities">
                  <Job
                    v-for="job in listJobs"
                    v-bind:job="job"
                    v-bind:image="jobDetail.company?.image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import JobDetail from "../../components/job-detail/JobDetail.vue";
import Job from "../../components/job-view/Job.vue";
import { useMenu } from "../../store/use-menu";
import {
  PhoneFilled,
  MailFilled,
  WifiOutlined,
  SendOutlined,
  DollarOutlined,
  PhoneOutlined,
  ContactsOutlined,
} from "@ant-design/icons-vue";
export default defineComponent({
  name: "admin-job-detail",
  components: {
    JobDetail,
    PhoneFilled,
    MailFilled,
    WifiOutlined,
    SendOutlined,
    DollarOutlined,
    PhoneOutlined,
    ContactsOutlined,
    Job,
  },
  setup() {
    const store = useMenu();
    store.onSelectedKeys(["post-management"]);
    store.onOpenKeys(["post-management"]);
  },
  data() {
    return {
      listJobs: [],
      idJob: this.$route.query.idJob,
      idCompany: this.$route.query.idCompany,
      jobDetail: [],
    };
  },
  // props: {
  //   idJob: Number,
  //   idCompany: Number,
  // },
  mounted() {
    this.getJobByCompany();
    this.getJobDetail();
  },
  watch: {
    $route() {
      this.idJob = this.$route.query.idJob;
      this.idCompany = this.$route.query.idCompany;
      this.getJobByCompany();
      this.getJobDetail();
    },
  },
  methods: {
    async getJobByCompany() {
      await axios
        .get("jobs/company/get_jobs", {
          params: { company_id: this.idCompany },
        })
        .then((response) => {
          this.listJobs = response.data;
          console.log(this.listJobs);
        })
        .catch((error) => console.log(error));
    },
    async getJobDetail() {
      console.log(this.idJob);
      await axios
        .get("jobs/user/" + this.idJob + "/job")
        .then((response) => {
          this.jobDetail = response.data.job;
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    },
  },
});
</script>
<style scoped>
.home main.ant-layout-content {
  position: relative;
  top: 64px;
  background-color: #f9f8f8;
  padding-bottom: 20px;
}
.applied-job-container {
  background: white;
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  min-height: 700px;
  margin: auto;
  margin-top: 20px;
  overflow-y: scroll;
  height: 600px;
}
.applied-job-container .title {
  font-size: 27px;
  font-family: Roboto, sans-serif;
  text-align: left;
  margin-top: 30px;
  margin-bottom: 1rem;
  margin-left: 100px;
  line-height: 35px;
}
.list-job-content {
  margin: 30px auto;
  max-width: 1350px;
  min-height: 700px;
  height: calc(100vh - 360px);
  background-color: transparent;
  border: none;
}

.list-job-content .list-job-wrapper {
  display: grid;
  grid-template-columns: 0.9fr 1fr;
  grid-gap: 10px;
  background-color: #e9e9e9;
  height: 100%;
}
.list-job-content .list-job-info-box,
.list-job-content .job-detail-box {
  height: 100%;
  overflow: hidden;
  background-color: white;
}
.list-job-content .list-job-info-box {
  overflow-y: scroll;
}

.list-job-content .job-detail-box__content {
  margin: 20px;
}
.total-job {
  padding: 15px 0;
  padding-bottom: 0;
  padding-left: 2rem;
  text-align: left;
}
.total-job h1 {
  font-weight: 550;
  font-size: 35px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.company-introduce {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  border-bottom: 1px solid #e9e9e9;
}
.company-introduce__logo {
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.company-introduce__logo__img {
  width: 130px;
  height: 130px;
  background: white;
  border: 1px solid #d2d2d2;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
}
.company-introduce__logo__img img {
  display: block;
  position: relative;
  max-width: 120px;
  max-height: 120px;
  width: auto;
  height: auto;
  margin: auto;
}
.company-introduce__info {
  padding-bottom: 10px;
  margin-bottom: 10px;
  margin-left: 25px;
  flex: 1;
}
.company-introduce__info__name {
  line-height: 35px;
  font-size: 32px;
  margin-bottom: 10px;
  text-align: left;
}
.company-introduce__info__item {
  display: grid;
  grid-row-gap: 4px;
}
.info-item {
  display: flex;
  align-items: center;
}
.info-item__text {
  margin-left: 10px;
  font-size: 15px;
}
.company-introduce__actions {
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.actions-btn {
  border: 1px solid #ea2635;
  color: #fff;
  background-color: #ea2635;
  width: 100px;
  height: 40px;
  line-height: 36px;
  padding: 0;
  outline: 0;
  text-decoration: none;
  position: relative;
  font-family: "Roboto", sans-serif;
  font-weight: 400 !important;
  border-radius: 4px;
  font-size: 15px;
  white-space: nowrap;
  -webkit-font-smoothing: antialiased;
  display: inline-block;
  text-align: center;
  margin-bottom: 10px;
}
.follow {
  color: #ea1e30;
  border: 0;
  background-color: #fff;
  text-decoration: none;
  border: 1px solid #ea2635;
}
</style>
