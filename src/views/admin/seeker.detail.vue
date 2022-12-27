<template>
  <div class="list-job">
    <div class="container">
      <div class="list-job-content">
        <div class="list-job-wrapper">
          <div class="list-job-info-box">
            <div class="job-detail-box__content">
              <div class="job-name">
                {{ seeker.first_name?.toUpperCase() }}
                {{ seeker.last_name?.toUpperCase() }}
                <!-- <div class="company">{{ jobDetail.company?.company_name }}</div> -->
              </div>
              <div class="job-detail-box__description">
                <div class="tag" v-if="skills.length">
                  <p v-for="skill in skills">{{ skill.skill_name }}</p>
                </div>
                <div class="info">
                  <WifiOutlined />
                  Da Nang
                </div>
                <div class="info">
                  <MailOutlined />
                  <p>{{ user.email }}</p>
                </div>
                <div class="info">
                  <PhoneOutlined />
                  <p>0935125585</p>
                </div>
                <div class="divider"></div>
                <div class="job-description">
                  <h2>Seeker Profile</h2>
                  <div class="profile-component">
                    <div class="profile-item">
                      <div class="profile-item__title">
                        <div class="profile-item__title__detail">
                          Education
                          <!-- <a><PlusCircleOutlined @click="showModal" /></a> -->
                        </div>
                      </div>
                      <div
                        class="profile-item__content"
                        v-for="education in educations"
                      >
                        <div class="content-title">
                          <div class="content-title-bar">
                            {{ education.certificate_degree_name }} -
                            {{ education.major }}
                            <div class="content-title-bar__icon">
                              <!-- <a><EditOutlined @click="showModal" /></a> -->
                              <!-- <a><DeleteOutlined @click="deleteEducation(education.id)" /></a> -->
                            </div>
                          </div>
                          <p>
                            {{ education.starting_date }} -
                            {{ education.completion_date }}
                          </p>
                          <p v-if="education.university_name">
                            {{ education.university_name }}
                          </p>
                          <p v-if="education.gpa">GPA: {{ education.gpa }}</p>
                        </div>
                      </div>
                    </div>
                    <div class="profile-item">
                      <div class="profile-item__title">
                        <div class="profile-item__title__detail">
                          Experience
                          <!-- <a><PlusCircleOutlined @click="showModal2" /></a> -->
                        </div>
                      </div>
                      <div
                        class="profile-item__content"
                        v-for="experience in experiences"
                      >
                        <div class="content-title">
                          <div class="content-title-bar">
                            {{ experience.job_title }}
                            <div class="content-title-bar__icon">
                              <!-- <a><EditOutlined @click="showModal2" /></a> -->
                              <!-- <a><DeleteOutlined /></a> -->
                            </div>
                          </div>
                          <p>
                            {{ experience.start_date }} -
                            {{ experience.end_date }}
                          </p>
                          <span v-if="experience.company"
                            >{{ experience.company }} -
                          </span>
                          <span v-if="experience.job_location">{{
                            experience.job_location
                          }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="profile-item">
                      <div class="profile-item__title">
                        <div class="profile-item__title__detail">
                          Skills
                          <!-- <a><PlusCircleOutlined @click="showModal1" /></a> -->
                        </div>
                      </div>
                      <div
                        class="profile-item__content"
                        v-for="skill in skills"
                      >
                        <div class="content-title">
                          <div class="content-title-bar">
                            {{ skill.skill_name }}
                            <div class="content-title-bar__icon">
                              <!-- <a><EditOutlined @click="showModal2" /></a> -->
                              <!-- <a><DeleteOutlined /></a> -->
                            </div>
                          </div>
                          <p>Level: {{ skill.skill_level }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="job-detail-box">
            <div class="job-detail-box__content">
              <div class="job-description">
                <h2>Applied Jobs</h2>
              </div>
              <div class="job-opportunities">
                <EmptyApplied v-if="!listAppliedJob.length" />
                <div class="list-job" v-for="job in listAppliedJob">
                  <div class="job-component" v-for="(job, i) in listDetailJob">
                    <a-card hoverable @click="onChange(i)">
                      <template #cover style="border: 1px solid #e9e9e9">
                        <div class="job__logo">
                          <img img v-bind:src="job.company.image" />
                        </div>
                      </template>
                      <div class="content-container">
                        <div class="job__content">
                          <p class="job__title">
                            {{ job.name }}
                          </p>
                          <div class="salary">
                            <DollarOutlined />
                            <p>{{ job.salary }}$</p>
                          </div>
                          <ul class="benefit">
                            <li class="benefit-text">
                              {{ job.description }}
                            </li>
                          </ul>
                          <div class="tag">
                            <p v-for="skill in job.skills">
                              {{ skill.name }}
                            </p>
                            <p v-if="job.category_name">
                              {{ job.category_name }}
                            </p>
                          </div>
                        </div>
                        <div class="city-and-date">
                          <div class="address">
                            <p v-for="location in job.locations">
                              {{ location.location_name }}
                            </p>
                            <p>Da Nang</p>
                          </div>
                        </div>
                      </div>
                    </a-card>
                  </div>
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
import {
  WifiOutlined,
  SendOutlined,
  PhoneOutlined,
  MailOutlined,
  DollarOutlined,
} from "@ant-design/icons-vue";
import axios from "axios";
import store from "../../store";
import Job from "../../components/job-view/Job.vue";
import EmptyApplied from "../../components/EmptyApplied.vue";
import { useMenu } from "../../store/use-menu";
export default defineComponent({
  name: "admin-seeker-detail",
  components: {
    WifiOutlined,
    SendOutlined,
    PhoneOutlined,
    MailOutlined,
    DollarOutlined,
    EmptyApplied,
    Job,
  },
  setup() {
    const store = useMenu();
    store.onSelectedKeys(["seeker-management"]);
    store.onOpenKeys(["seeker-management"]);
  },
  data() {
    const id = this.$route.params.id;
    const userId = store.state.user.id;
    return {
      skills: [],
      educations: [],
      experiences: [],
      user: {},
      seeker: {},
      id,
      listAppliedJob: [],
      listDetailJob: [],
      userId,
    };
  },
  mounted() {
    this.getSeeker();
    this.getListAppliedJob();
  },
  methods: {
    async getSeeker() {
      await axios
        .get("seekers/candidate-profile/get_all_information_user", {
          params: { id_candidate: this.id },
        })
        .then((response) => {
          const data = response.data;
          this.educations = data.educations;
          this.skills = data.skills;
          this.user = data.user;
          this.seeker = data.seeker;
          console.log(this.seeker);
        })
        .catch((error) => error);
    },
    async getListAppliedJob() {
      await axios
        .get("applicants/candidate/get_applicant", {
          params: { id_candidate: this.id },
        })
        .then(async (response) => {
          this.listAppliedJob = response.data;
          const detailPromise = this.listAppliedJob.map((item) => {
            return this.getJobDetail(item["job"]);
          });
          this.listDetailJob = await Promise.all(detailPromise);
          console.log(this.listAppliedJob);
          console.log(this.listDetailJob);
        })
        .catch((error) => console.log(error));
    },
    async getJobDetail(id: Number) {
      const data = await axios
        .get("jobs/user/" + id + "/job")
        .then((response) => {
          console.log(response.data.job);
          return response.data.job;
        });
      return data;
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
.job-detail-box__content h2 {
  text-align: left;
  font-size: 25px;
  color: #888686;
  font-weight: 550;
}
.profile-item__form .ant-form-item {
  margin-bottom: 10px;
}
.profile-item__form .ant-picker {
  border-radius: 7px;
}
.profile-item {
  margin: 20px 0;
  width: 90%;
}
.profile-item span {
  font-size: 15px !important;
}
.profile-item span.anticon.anticon-plus-circle {
  color: green;
}
.profile-item__btn {
  margin-bottom: 20px;
  margin-top: 10px;
  display: flex;
}
.profile-item__title {
  font-size: 21px;
  font-weight: 550;
  color: #2c3e50;
}
.content-title p,
.content-title span {
  margin: 0;
}
.content-title-bar {
  font-size: 17px;
  font-weight: 550;
}
.content-title-bar,
.profile-item__title__detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.content-title-bar__icon {
  display: flex;
  gap: 10px;
}
.content-title-bar__icon span.anticon.anticon-delete {
  color: gray;
}
.profile-item__content {
  border: 1px solid #e9e9e9;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 7px;
  box-shadow: 2px 2px 4px rgb(33 47 63 / 10%);
}
.content-title p {
  text-align: left;
}
</style>
