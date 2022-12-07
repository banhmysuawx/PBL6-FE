<template>
  <div class="applied-process-container" v-for="(job, index) in listAppliedJob">
    <div class="applied-job">
      <!-- <router-link :to="{ name: 'addLocation' }"> -->
      <p class="company__title">
        {{ listDetailJob[index].name }}
      </p>
      <div class="applied-process">
        <div id="test-status">
          <ul class="test-status">
            <li class="test-status-item active">Apply CV</li>
            <li class="test-status-item">Do Test</li>
            <li class="test-status-item">Interview</li>
            <li class="test-status-item">Result</li>
          </ul>
        </div>
        <div class="notification">
          <BellFilled />you have not taken the test
        </div>
      </div>
      <a-card>
        <template #cover style="border: 1px solid #e9e9e9">
          <div class="company__logo">
            <img alt="example" src="../assets/logo2.png" />
          </div>
        </template>
        <div class="content-container">
          <div class="company__content">
            <div class="salary">
              <DollarOutlined />
              <p>{{ listDetailJob[index].salary }}</p>
            </div>
            <ul class="benefit">
              <li class="benefit-text">Hình thức làm việc hybird</li>
              <li class="benefit-text">Bảo hiểm 100% lương</li>
              <li class="benefit-text">
                Đài thọ 100% chí phí học tập cho CBNV
              </li>
            </ul>
            <div class="tag">
              <p v-for="skill in listDetailJob[index].skills">{{ skill }}</p>
              <p>{{ listDetailJob[index].category_name }}</p>
            </div>
          </div>
          <div class="city-and-date">
            <div class="new"><p>New</p></div>
            <div class="address">
              <p v-for="location in listDetailJob[index].locations_name">
                {{ location }}
              </p>
            </div>
            <div class="date">
              {{ listDetailJob[index].limited_day_do_test }}d
            </div>
          </div>
        </div>
      </a-card>
      <div class="schedule">
        <div class="test">
          <ScheduleFilled /> Test Schedule: 15h30, 26th Nov 2022
        </div>
        <div class="test"><ScheduleFilled /> Interview Schedule</div>
      </div>
    </div>
    <!-- </router-link> -->
  </div>
</template>

<script lang="ts">
import { DeleteOutlined } from "@ant-design/icons-vue";
import { defineComponent } from "vue";
import axios from "axios";
import {
  BellFilled,
  DollarOutlined,
  ScheduleFilled,
} from "@ant-design/icons-vue";
export default defineComponent({
  name: "AppliedJobComponent",
  components: {
    DeleteOutlined,
    BellFilled,
    DollarOutlined,
    ScheduleFilled,
  },
  data() {
    const listDetailJob: any[] = [];
    return {
      listAppliedJob: [],
      listDetailJob,
    };
  },
  mounted() {
    this.getListAppliedJob();
  },
  methods: {
    async getListAppliedJob() {
      await axios
        .get("https://api.quangdinh.me/applicants/candidate/get_applicant", {
          params: { id_candidate: 8 },
        })
        .then(async (response) => {
          this.listAppliedJob = response.data;
          const detailPromise = this.listAppliedJob.map((item) =>
            this.getJobDetail(item["job"])
          );
          this.listDetailJob = await Promise.all(detailPromise);
          console.log(this.listAppliedJob);
          console.log(this.listDetailJob);
        })
        .catch((error) => console.log(error));
    },
    async getJobDetail(id: Number) {
      const data = await axios
        .get("https://api.quangdinh.me/jobs/jobs/" + id)
        .then((response) => {
          return response.data;
        });
      return data;
    },
  },
});
</script>
<style scoped>
.applied-process-container {
  padding-bottom: 20px;
  border-bottom: 1px solid #e9e9e9;
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
li.test-status-item.active {
  background-color: #007082;
}
li.test-status-item.active:after {
  border-left: 15px solid #007082;
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
.notification {
  padding: 3px 4px;
  margin-top: 15px;
  border: 1px solid rgb(235, 129, 129);
  border-radius: 3px;
  background: rgb(235, 129, 129);
  color: white;
  width: fit-content;
  margin-left: 45%;
}
.applied-job {
  width: 100%;
}
/* .applied-job {
  margin: 0 5px;
} */
.applied-job .ant-card.ant-card-bordered {
  display: flex;
  border: 0;
}
.applied-job .ant-card.ant-card-bordered {
  width: 80%;
  min-height: 150px;
  margin: 10px 100px;
}
.applied-process-container .applied-job .company__logo {
  height: 100%;
  padding: 1rem 1rem;
}
.applied-process-container .applied-job .company__logo img {
  display: block;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  max-width: 140px;
  max-height: 140px;
  width: auto;
  height: auto;
  margin: auto;
  margin-top: 0;
}
.applied-job .company__content {
  height: 100%;
  text-align: left;
}
.applied-process-container .company__title {
  font-size: 22px;
  font-weight: 550;
  line-height: 28px;
  margin: 30px 0;
}
.applied-job .benefit {
  padding: 0 0 0 19px;
  font-weight: 500;
  font-size: 14px;
}
.content-container {
  display: flex;
}
.applied-job .star {
  margin: auto 5px;
  margin-bottom: 24px;
  padding: 0 4px;
  background: #f4f4f4;
}
.applied-job .star span.anticon.anticon-delete {
  color: #999;
}
.salary {
  display: flex;
  color: green;
}
span.anticon {
  padding: 2px;
  padding-right: 10px;
}
.tag {
  display: flex;
}
.tag p {
  margin: 2px;
  margin-right: 10px;
  padding: 2px 5px;
  border: 1px solid #e9e9e9;
  border-radius: 3px;
  color: #888686;
  font-size: 13px;
}
.tag p:hover {
  color: red;
  border: 1px solid red;
}
.applied-process-container p.company__title:hover {
  color: red;
}
.applied-job .ant-card-body {
  display: flex;
}
.applied-job .city-and-date {
  min-width: 100px;
  margin-left: 1.5rem;
  position: absolute;
  top: 20%;
  right: 20px;
  bottom: 0;
}
.applied-job .city-and-date .new p {
  font-size: 15px;
  color: white;
  padding: 2px 5px;
  border: 1px solid rgb(69, 186, 218);
  background: rgb(69, 186, 218);
}
.applied-job .city-and-date .address {
  margin: 2rem 0;
  text-align: right;
  color: #888686;
}
.applied-job .city-and-date .address p {
  font-size: 13px;
  line-height: 15px;
  margin-bottom: 5px !important;
}
.applied-job .city-and-date .date {
  text-align: right;
  color: #888686;
}
.schedule {
  text-align: left;
  color: #007082;
  border: 1px solid rgb(238, 189, 205);
  width: 80%;
  padding-left: 20%;
  background: rgb(238, 189, 205);
  margin: 10px 100px;
}
.test {
  display: flex;
}
</style>
