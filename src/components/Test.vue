<template>
  <div class="list-job">
    <div class="container">
      <div class="list-job-content">
        <empty-applied v-if="data.length == 0" />
        <div class="list-job-wrapper" v-else>
          <div class="list-job-info-box">
            <div class="test-title">
              <h1>{{ data.name }}</h1>
              <!-- <p class="company-name">Company: Paradox</p> -->
              <p class="time-limit">Time limit: {{ data.time_limit }}</p>
              <div class="countdown">
                <a-statistic-countdown
                  :value="deadline"
                  style="margin-right: 50px"
                  @finish="onSubmit"
                />
              </div>
            </div>
            <div
              class="applied-job"
              v-for="(question, index) in data.questions"
            >
              <div class="quiz-container">
                <div class="score">
                  <CheckCircleFilled />
                  1 điểm
                </div>
                <p class="question">
                  Câu {{ index + 1 }}: {{ question.content }}
                </p>
                <div class="answer-container">
                  <RadioGroup v-model:value="result[index].answers[0]">
                    <Radio
                      class="answer-item"
                      v-for="answer in question.answers"
                      v-bind:value="answer.id"
                      >{{ answer.content }}</Radio
                    >
                  </RadioGroup>
                </div>
              </div>
            </div>
          </div>
          <div class="list-question-container">
            <div class="list-question__box">
              <div class="question-tag">Câu hỏi</div>
              <div class="list-question">
                <p class="question" v-for="(question, index) in data.questions">
                  {{ index + 1 }}. {{ question.content }}
                </p>
              </div>
              <div class="submit-btn">
                <a-button @click="onSubmit">Submit</a-button>
              </div>
              <a-modal v-model:visible="visible" title="Result" @ok="handleOK">
                <a-progress type="circle" :percent="100" :width="80" />
                <h2 class="result">{{ finalResult }}</h2>
              </a-modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { RadioGroup, Radio } from "ant-design-vue";
import { CheckCircleFilled } from "@ant-design/icons-vue";
import axios from "axios";
import { formatDate, openNotification } from "../utils";
import EmptyApplied from "./EmptyApplied.vue";
import store from "../store";
export default defineComponent({
  name: "Test",
  components: {
    RadioGroup,
    Radio,
    CheckCircleFilled,
    EmptyApplied,
  },
  data() {
    return {
      data: [],
      deadline: Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30,
      result: [],
      time_start: new Date().toISOString(),
      id: this.$route.params.id,
      userId: localStorage.getItem("id"),
      job: this.$route.query.job,
      visible: false,
      finalResult: 0,
      access: axios.defaults.headers.common["Authorization"],
    };
  },
  mounted() {
    this.getTest();
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOK() {
      this.$router.push({ name: "appliedJob" });
    },
    async getTest() {
      delete axios.defaults.headers.common["Authorization"];
      await axios
        .get("https://api-exam.quangdinh.me/api/v1/test/" + this.id)
        .then((response) => {
          const data = response.data[0];
          this.data = data;
          this.deadline = Date.now() + 1000 * 60 * 60 * Number(data.time_limit);
          const result = data.questions.map((item: any) => {
            return { id: item.id, answers: [0] };
          });
          this.result = result;
        })
        .catch((error) => console.log(error));
    },
    async onSubmit() {
      this.refreshToken();
      const data = {
        user_id: this.userId,
        job_id: this.id,
        questions: this.result,
        time_done: formatDate(new Date().toISOString()),
        time_start: formatDate(this.time_start),
      };
      console.log(data);
      await axios
        .post(
          "https://api-exam.quangdinh.me/api/v1/test/" + this.id + "/doing",
          data
        )
        .then((response) => {
          const result = response.data.data?.result;
          if (result) {
            this.visible = true;
            this.finalResult = result;
            this.doneTest(result);
          }
        })
        .catch((error) => console.log(error));
      // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
    async refreshToken() {
      const data = await axios
        .post("/auth/token/refresh", {
          refresh: localStorage.getItem("refresh"),
        })
        .then((response) => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.access;
          console.log(axios.defaults.headers.common["Authorization"]);
          return response.data;
        });
    },
    async doneTest(result: Number) {
      const input = {
        job: this.job,
        user: this.userId,
        result,
      };
      console.log(input);
      await axios
        .patch("applicants/candidate/done_test", input)
        .then((response) => console.log(response.data.msg))
        .catch((error) => console.log(error));
    },
  },
});
</script>
<style scoped>
.container {
  background-color: #f9f8f8;
  position: relative;
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
  grid-template-columns: 1fr 0.5fr;
  grid-gap: 10px;
  background-color: #e9e9e9;
  height: 100%;
}
.list-job-content .list-job-info-box,
.list-job-content .list-question-container {
  height: 100%;
  overflow: hidden;
  background-color: white;
}
.list-job-content .list-job-info-box {
  overflow-y: scroll;
}
.applied-job {
  margin: 10px 50px;
}
.quiz-container {
  text-align: left;
  padding: 5px 10px;
  border: 1px solid #e9e9e9;
  border-radius: 4px;
  margin-bottom: 15px;
}
.score {
  text-align: right;
}
.answer-container label.ant-radio-wrapper.ant-radio-wrapper-checked,
.answer-container label.ant-radio-wrapper.answer-item {
  display: block;
}
.answer-container ::after {
  background-color: #007082;
}
.answer-container .ant-radio-checked .ant-radio-inner {
  border-color: #007082;
}
.answer-container
  label.ant-radio-wrapper.ant-radio-wrapper-checked.answer-item {
  color: green;
}
.quiz-container {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.question {
  font-size: 17px;
  font-weight: 550;
}
p.question {
  margin-bottom: 5px !important;
}
.answer-container {
  margin-left: 20px;
}
.answer-item {
  font-size: 15px;
}
.list-question {
  text-align: left;
  overflow-y: scroll;
  height: 550px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.list-question .question {
  font-weight: normal;
  font-size: 14px;
}
.list-question__box {
  position: relative;
  margin: 20px;
  height: 100%;
  white-space: normal;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.list-question__box .question-tag {
  font-size: 20px;
  font-weight: 550;
  padding-bottom: 10px;
  color: #06525e;
}
.list-question__box .submit-btn {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  text-align: center;
  border-top: 1px solid #e9e9e9;
}
.list-question__box button.ant-btn {
  width: 50%;
  font-size: 20px;
  font-weight: 550;
  height: 40px;
  background: #007082;
  color: white;
  border-radius: 8px;
  margin: 30px auto;
}
.list-question::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}
.test-title {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  line-height: 20px;
  margin: 20px 0;
}
.test-title h1 {
  padding-bottom: 10px;
  font-size: 33px;
  color: #06525e;
}
.test-title .company-name,
.test-title .time-limit {
  line-height: 10px;
  font-size: 15px;
  color: #007082;
}
.list-question-container .ant-modal-content {
  width: fit-content !important;
}
.list-question-container span.ant-progress-text {
  top: 40% !important;
  left: 50% !important;
}
.list-question-container .ant-progress-inner {
  width: 150px !important;
  height: 180px !important;
  font-size: 60px !important;
}
.list-question-container
  .ant-progress.ant-progress-circle.ant-progress-show-info.ant-progress-default.ant-progress-status-success {
  padding: 10px 40px;
}
</style>
