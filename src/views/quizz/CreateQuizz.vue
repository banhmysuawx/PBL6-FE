<template>
  <el-container class="layout-container-demo">
    <SideBar />
    <el-container>
      <el-header style="height: 80px; background: #007082; padding: 0"
        ><HeaderCompanyView
      /></el-header>
      <el-container>
        <el-aside style="width: 500px">
          <el-row></el-row>
          <el-row>
            <el-col :span="8" style="font-size: 20px"
              ><b>{{ this.list_question.length }} questions</b></el-col
            >
          </el-row>
          <el-row v-for="(item, index) in list_question" :key="item">
            <el-icon><CloseBold /></el-icon>
            <el-card
              class="box-card"
              style="margin: 0px 10px; background: rgba(139, 196, 71, 0.6)"
            >
              {{ index + 1 }}. {{ item.content }}
            </el-card>
          </el-row>
        </el-aside>
        <el-main>
          <div class="main-container">
            <el-row style="margin: 0px 20px">
              <el-card class="box-card">
                <template #header>
                  <div class="card-header">
                    <span class="card-header__title">Information of Test</span>
                    <a-button
                      class="card-header__btn"
                      type="primary"
                      @click="CreateNewQuizz()"
                      >Publish</a-button
                    >
                  </div>
                </template>
                <div class="card-content">
                  <div class="card-title">
                    <span>Name Test</span>
                  </div>
                  <div class="card-input">
                    <a-input v-model="name" placeholder="Please input" />
                  </div>
                  <div class="card-title">
                    <span>Category</span>
                  </div>
                  <div class="card-input">
                    <el-select
                      v-model="category"
                      class="m-2"
                      placeholder="Select"
                    >
                      <el-option
                        v-for="item in list_category"
                        :key="item"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </div>
                  <div class="card-title">
                    <span>Description</span>
                  </div>
                  <div class="card-input">
                    <a-textarea placeholder="Please input" />
                  </div>
                  <div class="card-title">
                    <span>Time Limit</span>
                  </div>
                  <div class="card-input">
                    <el-input-number v-model="time_limit" :step="15" />
                  </div>
                  <div class="card-title">
                    <span>Percent Pass (%)</span>
                  </div>
                  <div class="card-input">
                    <el-input-number
                      v-model="percent_pass"
                      :min="0"
                      :max="100"
                      @change="handleChange"
                      :step="10"
                    />
                  </div>
                </div>
              </el-card>
            </el-row>

            <el-row class="question" style="margin: 20px">
              <el-card class="box-card">
                <template #header>
                  <div class="card-header">
                    <span class="card-header__title">Detail of question</span>
                  </div>
                </template>

                <el-row>
                  <el-col :span="20"></el-col>
                  <el-col :span="4"
                    ><el-button type="primary" plain @click="addQuestion()"
                      >Add Question</el-button
                    ></el-col
                  >
                </el-row>

                <el-row :gutter="20">
                  <el-col span="4" style="margin-top: 15px; font-size: 20px"
                    >Question:
                  </el-col>
                  <el-col :span="20" class="card-input">
                    <a-textarea
                      v-model="value_answer.question"
                      placeholder="Please input"
                  /></el-col>
                </el-row>
                <el-radio-group v-model="value_answer.is_check">
                  <el-row v-for="index in len_answer" :key="index">
                    <el-col :span="4">
                      <el-radio :label="index" size="large"></el-radio>
                    </el-col>
                    <el-col :span="20" class="card-input">
                      <a-input
                        style="width: 550px"
                        v-model="value_answer.value[index]"
                        placeholder="Please input"
                      />
                    </el-col>
                  </el-row>
                </el-radio-group>
                <el-row>
                  <el-col :span="8"></el-col>
                  <el-col :span="8"
                    ><el-button type="primary" plain @click="addAnswer()"
                      >Add more answer</el-button
                    ></el-col
                  >
                  <el-col :span="8"></el-col>
                </el-row>
              </el-card>
            </el-row>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import HeaderCompanyView from "@/components/HeaderCompany.vue";
import { ElNotification } from "element-plus";
import axios from "axios";
import { toast } from "bulma-toast";

export default {
  name: "CreateQuizz",
  components: {
    SideBar,
    HeaderCompanyView,
  },
  data() {
    return {
      name: "",
      description: "",
      category: null,
      time_limit: 30,
      percent_pass: 0.0,
      len_answer: 3,
      value_answer: {
        question: "",
        value: ["", "", ""],
        is_check: false,
      },
      list_question: [],
      list_category: [],
    };
  },
  mounted() {
    delete axios.defaults.headers.common["Authorization"];
    axios
      .get("https://api-exam.quangdinh.me/api/v1/test/category")
      .then((response) => {
        this.list_category = response.data.results;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    addAnswer() {
      this.len_answer += 1;
      this.value_answer.value.push("");
    },
    addQuestion() {
      var is_check = true;
      var list_answer = [];
      if (this.value_answer.is_check == false) is_check = false;
      if (this.value_answer.question.length == 0) is_check = false;
      if (this.value_answer.value[1].length == 0) is_check = false;
      if (is_check) {
        ElNotification({
          title: "Success",
          message: "Add question success message",
          type: "success",
        });
        for (var i = 0; i < this.value_answer.value.length - 1; i++) {
          const data_answer = {
            content: this.value_answer.value[i + 1],
            is_correct: false,
          };
          if (i + 1 == this.value_answer.is_check) {
            data_answer["is_correct"] = true;
          }
          list_answer.push(data_answer);
        }
        const data = {
          content: this.value_answer.question,
          is_multiple_choice: false,
          answers: list_answer,
        };

        this.list_question.push(data);

        this.value_answer.question = "";
        this.value_answer.is_check = false;
        this.value_answer.value = ["", "", ""];
        this.len_answer = 3;
      } else {
        ElNotification({
          title: "Warning",
          message: "Please fill all field",
          type: "warning",
        });
      }
      console.log("hiiii");
      console.log(this.list_question);
    },
    CreateNewQuizz() {
      delete axios.defaults.headers.common["Authorization"];
      const data = {
        name: this.name,
        category: this.category,
        time_limit: this.time_limit,
        percent_to_pass: this.percent_pass,
        description: this.description,
        questions: this.list_question,
      };
      axios
        .post("https://api-exam.quangdinh.me/api/v1/test", data)
        .then((response) => {
          console.log(response);
          this.list_category = [];
          toast({
            message: "Create Quizz successful",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: "top-right",
          });
          this.name = "";
          this.description = "";
          this.time_limit = 30;
          this.percent_pass = 0.0;
          this.$router.push({ name: "company-quizz" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
@import "../../assets/css/index.css";
.card-header__title {
  font-size: 25px !important;
  padding: 3px !important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif !important;
  font-weight: 550 !important;
}
.card-header__btn {
  background: #007082 !important;
  border-color: #007082 !important;
  font-size: 17px !important;
  padding: 3px 20px !important;
  font-weight: 550 !important;
}
.card-header__btn span {
  padding: 0;
}
.card-header {
  height: fit-content;
  padding: 10px;
}
.card-content {
  display: grid;
  grid-template-columns: 0.3fr 1fr;
}
.card-content input.ant-input {
  text-align: left;
  width: 100% !important;
  height: 35px;
}
.card-title {
  font-size: 16px;
  font-weight: 550;
  text-align: right;
  margin: auto 0;
}
.card-input {
  padding-bottom: 10px;
  padding-left: 20px;
  text-align: left;
}
.card-input .el-input__wrapper {
  border-radius: 10px;
}
.card-input .el-select.m-2 {
  width: 100%;
  margin: 0 !important;
}
.card-input textarea.ant-input {
  width: 100% !important;
}
.card-input .el-input__wrapper {
  height: 35px;
  font-size: 16px;
  color: black;
}
.question .card-input {
  padding: 0;
}
.question .el-col.el-col-20.card-input,
.question input.ant-input {
  width: 100% !important;
}
.question .el-radio-group {
  display: grid;
}
.question .el-col.is-guttered {
  font-size: 18px !important;
  font-weight: 550;
}
</style>
