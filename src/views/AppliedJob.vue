<template>
  <div class="home">
    <a-layout>
      <Header />
      <a-layout-content>
        <!-- <div class="applied-job-container">
          <div class="title">Applied Jobs</div>
          <AppliedJobComponent />
        </div> -->
        <div class="list-job">
          <div class="container">
            <div class="list-job-content">
              <empty-applied v-if="listAppliedJob.length == 0" />
              <div class="list-job-wrapper" v-else>
                <div class="list-job-info-box">
                  <div class="total-job">
                    <h1>Applied Jobs</h1>
                  </div>
                  <div class="list-job">
                    <!--  -->
                    <div
                      class="job-component"
                      v-for="(job, i) in listDetailJob"
                    >
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
                            <a-alert
                              class="alert"
                              v-bind:message="status[listAppliedJob[i].status]"
                              type="warning"
                            />
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
                    <!--  -->
                  </div>
                </div>
                <div class="job-detail-box" v-if="listAppliedJob">
                  <div class="job-detail-box__content">
                    <div class="job-name">
                      {{ listDetailJob[index]?.name }}
                      <div class="company">
                        {{ listDetailJob[index]?.company.company_name }}
                      </div>
                      <a-alert
                        class="alert"
                        v-bind:message="status[listAppliedJob[index]?.status]"
                        type="warning"
                      />
                    </div>
                    <div class="job-detail-box__description">
                      <div class="tag">
                        <p v-for="skill in listDetailJob[index]?.skills">
                          {{ skill.name }}
                        </p>
                      </div>
                      <div class="salary">
                        <DollarOutlined />
                        <p>{{ listDetailJob[index]?.salary }}</p>
                      </div>
                      <div class="info">
                        <WifiOutlined />
                        <p>
                          {{
                            listDetailJob[index]?.locations
                              ?.map((item) => item.location_name)
                              .join(", ")
                          }}
                        </p>
                      </div>
                      <div class="info">
                        <PhoneOutlined />
                        <p>0935125585</p>
                      </div>
                      <div class="divider"></div>
                      <div class="applied-process">
                        <div id="test-status">
                          <ul class="test-status">
                            <li
                              class="test-status-item apply"
                              :style="{
                                '--bg-color-apply':
                                  listProcess[index]?.status_do_apply,
                              }"
                            >
                              Apply CV
                            </li>
                            <li
                              class="test-status-item test"
                              :style="{
                                '--bg-color':
                                  listProcess[index]?.status_do_test,
                              }"
                              @click="
                                doTest(
                                  listDetailJob[index]?.id_test,
                                  listDetailJob[index]?.name,
                                  listAppliedJob[index]?.status,
                                  listDetailJob[index]?.id
                                )
                              "
                            >
                              Do Test
                            </li>
                            <li
                              class="test-status-item interview"
                              :style="{
                                '--bg-color-interview':
                                  listProcess[index]?.status_do_interview,
                              }"
                              @click="
                                showModal(
                                  listAppliedJob[index]?.status,
                                  listAppliedJob[index]?.id
                                )
                              "
                            >
                              Interview
                            </li>
                            <li
                              class="test-status-item result"
                              :style="{
                                '--bg-color-result':
                                  listProcess[index]?.status_result,
                              }"
                            >
                              Result
                            </li>
                          </ul>
                          <a-modal
                            v-model:visible="visible"
                            title="Time Interview"
                            @ok="confirmInterview(listAppliedJob[index]?.id)"
                            style="width: fit-content !important"
                          >
                            <div
                              class="date-component"
                              v-for="date in listTime"
                            >
                              <div class="title">{{ date.day }}</div>

                              <a-checkbox-group
                                v-for="item in date.available"
                                v-model:value="value"
                              >
                                <a-row>
                                  <a-col>
                                    <a-checkbox
                                      v-bind:value="
                                        date.day +
                                        '/' +
                                        item.start +
                                        '/' +
                                        item.end
                                      "
                                      >{{ item.start }} -
                                      {{ item.end }}</a-checkbox
                                    >
                                  </a-col>
                                </a-row>
                              </a-checkbox-group>
                            </div>
                          </a-modal>
                        </div>
                        <!-- <div class="notification"> -->
                        <!-- <BellFilled />you have not taken the test -->
                        <!-- </div> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a-layout-content>
      <Footer />
    </a-layout>
  </div>
</template>
<script lang="ts">
import EmptyApplied from "../components/EmptyApplied.vue";
import Header from "../layouts/header.vue";
import Footer from "../layouts/footer.vue";
import axios from "axios";
import { Process } from "../utils";
import store from "../store";
import {
  WifiOutlined,
  ContactsOutlined,
  PhoneOutlined,
  DollarOutlined,
} from "@ant-design/icons-vue";
import { status } from "../utils";
export default {
  name: "AppliedJob",
  components: {
    EmptyApplied,
    Header,
    Footer,
    WifiOutlined,
    ContactsOutlined,
    PhoneOutlined,
    DollarOutlined,
  },
  data() {
    const userId = store.state.user.id;
    const listDetailJob = [];
    const listProcess: Process[] = [];
    return {
      index: 0,
      status,
      userId,
      listAppliedJob: [],
      available: [],
      listDetailJob,
      listProcess,
      listTime: [],
      visible: false,
      value: "",
      date_limit: { date_limit_do_test: "", date_limit_interview: "" },
    };
  },
  mounted() {
    this.getListAppliedJob();
    console.log(this.userId);
  },
  methods: {
    onChange(i: number) {
      this.index = i;
    },
    showModal(status: string, id_applicant: Number) {
      if (status == "interview_pending") {
        this.getTimeInterview(id_applicant);
        // this.available();
        this.visible = true;
      }
    },
    setStatus(status) {
      const process: Process = {
        status_do_apply: "#e9e9e9",
        status_do_test: "#e9e9e9",
        status_do_interview: "#e9e9e9",
        status_result: "#e9e9e9",
      };
      switch (status) {
        case "apply":
          process.status_do_apply = "#f4e25e";
          break;
        case "test":
          process.status_do_test = "#f4e25e";
          process.status_do_apply = "#007082";
          break;
        case "set_schedule":
        case "interview_pending":
        case "schedule_interview":
        case "cancel_interview":
          process.status_do_apply = "#007082";
          process.status_do_test = "#007082";
          process.status_do_interview = "#f4e25e";
          break;
        case "interview_complete":
          process.status_do_interview = "#007082";
          process.status_result = "#f4e25e";
          break;
        case "complete":
          process.status_do_apply = "#007082";
          process.status_do_test = "#007082";
          process.status_do_interview = "#007082";
          process.status_result = "#007082";
          break;
        case "incomplete":
          process.status_do_apply = "#007082";
          process.status_do_test = "#007082";
          process.status_do_interview = "#007082";
          process.status_result = "rgb(235, 129, 129)";
          break;
      }
      return process;
    },
    available() {
      for (let i = 1; i <= 23; i++) {
        this.available.push(`${i}:00 : ${i + 1}:00`);
      }
    },
    async doTest(
      id_test: Number,
      company: String,
      status: String,
      job: Number
    ) {
      if (status == "apply" || status == "test")
        this.$router.push({
          name: "test",
          params: {
            company: company,
            id: id_test,
          },
          query: {
            job: job,
          },
        });
    },
    async getListAppliedJob() {
      await axios
        .get("applicants/candidate/get_applicant", {
          params: { id_candidate: this.userId },
        })
        .then(async (response) => {
          this.listAppliedJob = response.data;
          const detailPromise = this.listAppliedJob.map((item) => {
            this.listProcess.push(this.setStatus(item["status"]));
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
          // const updatedAt = new Date(response.data.updated_at);
          // const limit_do_test = response.data.limited_day_do_test;
          // const date_limit_do_test = new Date(
          //   updatedAt.setDate(updatedAt.getDate() + limit_do_test)
          // );
          // this.date_limit.date_limit_do_test =
          //   date_limit_do_test.toLocaleString();
          console.log(response.data.job);
          return response.data.job;
        });
      return data;
    },
    async getTimeInterview(id: Number) {
      axios
        .get(
          "https://api.quangdinh.me/applicants/candidate/get_times_interview",
          { params: { id_applicant: id } }
        )
        .then((response) => {
          console.log(id);
          this.listTime = response.data;
          console.log(this.listTime);
        })
        .catch((error) => console.log(error));
    },
    async confirmInterview(id: Number) {
      const listTime = this.value.toString().split("/");
      if (listTime.length > 0) {
        const input = {
          day: listTime[0],
          start_time: listTime[1],
          end_time: listTime[2],
        };
        console.log(input);
        await axios
          .patch(
            "https://api.quangdinh.me/applicants/candidate/confirm_interview",
            input,
            {
              params: {
                id_applicant: id,
              },
            }
          )
          .then()
          .catch((error) => error);
      }
      this.visible = false;
    },
  },
};
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
.home main.ant-layout-content {
  position: relative;
  top: 64px;
  background-color: #f9f8f8;
}
.container {
  background: #f9f8f8;
  position: relative;
  padding-bottom: 5px;
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
.alert {
  width: fit-content;
  padding: 3px 20px;
  margin-bottom: 10px;
}
.job-name .alert {
  margin: auto;
}
.apply-process {
  display: flex;
  align-items: center;
  justify-content: left;
  margin-bottom: 20px;
}
#test-status {
  position: relative;
  width: auto;
  height: 50px;
}
.test-status li {
  position: relative;
  text-indent: 30px;
  height: 50px;
  background-color: #767676;
  display: inline-block;
  zoom: 1;
  *display: inline;
  margin-left: 15px;
  padding: 10px;
  color: white;
  font-size: 18px;
  text-align: center;
  line-height: 30px;
}

ul.test-status {
  list-style: none;
}

li.test-status:first-child:after,
li.test-status-item:after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border-top: 25px solid transparent;
  border-left: 15px solid #767676;
  border-bottom: 25px solid transparent;
  margin: -10px 90px 0 10px;
}
li.test-status:last-child:before,
li.test-status-item:before {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  left: 0;
  border-top: 25px solid transparent;
  border-left: 15px solid white;
  border-bottom: 25px solid transparent;
  margin: -10px 0px 0 0px;
}

li.test-status:first-child {
  padding-left: 10px;
  margin-left: 0;
}
li.test-status:last-child {
  padding-right: 15px;
}

li.test-status-item {
  background-color: #d1d0d0;
}
li.test-status-item:after {
  border-left: 15px solid #d1d0d0;
}
li.test-status-item.test {
  background: var(--bg-color);
}
li.test-status-item.test::after {
  border-left: 15px solid var(--bg-color);
}
li.test-status-item.interview {
  background: var(--bg-color-interview);
}
li.test-status-item.interview::after {
  border-left: 15px solid var(--bg-color-interview);
}
li.test-status-item.result {
  background: var(--bg-color-result);
}
li.test-status-item.result::after {
  border-left: 15px solid var(--bg-color-result);
}
li.test-status-item.apply {
  background: var(--bg-color-apply);
}
li.test-status-item.apply::after {
  border-left: 15px solid var(--bg-color-apply);
}
</style>
