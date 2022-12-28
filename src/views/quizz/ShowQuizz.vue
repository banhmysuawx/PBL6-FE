<template>
  <el-container class="layout-container-demo">
    <SideBar />
    <el-container>
      <el-header style="height: 50px"><HeaderCompanyView /></el-header>
      <el-container>
        <el-main>
          <div class="main-container">
            <el-row style="margin: 20px">
              <el-col :span="24"
                ><el-button
                  class="button"
                  type="primary"
                  @click="CreateNewQuizz()"
                  >Create New Quizz</el-button
                ></el-col
              >
            </el-row>
            <el-row :gutter="20" style="margin: 20px" v-for="index in n">
              <el-col :span="8" v-for="i in 3">
                <el-card
                  class="box-card"
                  v-if="(index - 1) * 3 + i - 1 < this.list_quiz.length"
                  style="height: 370px"
                >
                  <template #header>
                    <div
                      class="card-header"
                      style="background-color: rgba(121, 173, 132, 0.6)"
                    >
                      <span>{{ list_quiz[(index - 1) * 3 + i - 1].name }}</span>
                    </div>
                  </template>
                  <div class="card-body">
                    <div class="card-body__title">
                      <el-icon size="15px"><AlarmClock /></el-icon> :
                    </div>
                    <div class="card-body__content">
                      <span>
                        {{ list_quiz[(index - 1) * 3 + i - 1].time_limit }}
                        min</span
                      >
                    </div>
                    <div class="card-body__title">
                      <span>Category:</span>
                    </div>
                    <div class="card-body__content">
                      <span> Development</span>
                    </div>
                    <div class="card-body__title">
                      <span>Total:</span>
                    </div>
                    <div class="card-body__content">
                      <span>
                        {{
                          list_quiz[(index - 1) * 3 + i - 1].questions.length
                        }}
                        questions</span
                      >
                    </div>
                    <div class="card-body__title">
                      <span>Descripion:</span>
                    </div>
                    <div class="card-body__content">
                      <span>
                        {{
                          list_quiz[(index - 1) * 3 + i - 1].description
                        }}</span
                      >
                    </div>
                  </div>
                  <div class="card-btn">
                    <a-button
                      type="primary"
                      plain
                      @click="DetailQuiz(list_quiz[(index - 1) * 3 + i - 1].id)"
                      >Detail</a-button
                    >
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
  <el-drawer
    v-model="drawCreateNewQuiz"
    title="Information Quizz"
    :direction="direction"
    :before-close="handleClose"
  >
    <el-row></el-row>
    <el-row>
      <el-col :span="8" style="margin-top: 10px; text-align: left"
        >Name Quizz</el-col
      >
      <el-col :span="16"
        ><el-input v-model="input" placeholder="Please input"
      /></el-col>
    </el-row>
    <el-row>
      <el-col :span="7" style="margin-top: 10px; text-align: left"
        >Category</el-col
      >
      <el-col :span="15"
        ><el-select v-model="value" class="m-2" placeholder="Select">
          <el-option
            v-for="item in 5"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" style="text-align: left">Percent Pass (%)</el-col>
      <el-col :span="7"
        ><el-input-number
          v-model="num"
          :min="1"
          :max="10"
          @change="handleChange"
      /></el-col>
    </el-row>
    <el-row>
      <el-col :span="8" style="text-align: left">Time Limit</el-col>
      <el-col :span="7"
        ><el-input-number
          v-model="num"
          :min="1"
          :max="10"
          @change="handleChange"
      /></el-col>
    </el-row>
    <el-row>
      <el-col :span="8" style="text-align: left">Description</el-col>
    </el-row>
    <el-row>
      <el-input
        style="height: 100px"
        v-model="textarea"
        :rows="2"
        type="textarea"
        maxlength="100"
        placeholder="Please input"
        show-word-limit
      />
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button type="primary" style="width: 100px; float: right"
          >Next</el-button
        >
      </el-col>
    </el-row>
  </el-drawer>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import HeaderCompanyView from "@/components/HeaderCompany.vue";
import axios from "axios";

export default {
  name: "ShowQuizz",
  components: {
    SideBar,
    HeaderCompanyView,
  },
  data() {
    return {
      drawCreateNewQuiz: false,
      list_quiz: [],
      n: 0,
    };
  },
  mounted() {
    delete axios.defaults.headers.common["Authorization"];
    axios
      .get("https://api-exam.quangdinh.me/api/v1/test")
      .then((response) => {
        this.list_quiz = response.data;
        console.log("hellooooooo");
        console.log(response.data);
        if (this.list_quiz.length % 3 == 0)
          this.n = Math.floor(this.list_quiz.length / 3);
        else this.n = Math.floor(this.list_quiz.length / 3) + 1;
        console.log(this.n);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    CreateNewQuizz() {
      this.$router.push({ name: "create-quizz" });
    },
    DetailQuiz(id) {
      this.$router.push({ path: `/company/quizz/${id}` });
    },
  },
};
</script>

<style>
@import "../../assets/css/index.css";
.el-card__header span {
  width: fit-content;
  margin: auto;
  font-size: 18px;
  padding: 3px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 550;
}
.card-body {
  display: grid;
  grid-template-columns: 0.8fr 1fr;
}
.card-body__title {
  font-size: 16px;
  text-align: right;
  font-weight: 550;
  padding-right: 10px;
}
.card-body__content {
  text-align: left;
  padding-left: 10px;
  font-weight: 16px;
}
.el-card__body {
  position: relative;
  height: 80%;
}
.card-btn {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 30px;
}
.card-btn button.ant-btn.ant-btn-primary {
  background: #007082;
  border-color: #007082;
  font-size: 16px;
  padding: 3px 20px;
  font-weight: 550;
}
.el-col.el-col-24 .button.el-button.el-button--primary.button {
  font-size: 18px;
  font-weight: 550;
  padding: 15px 25px;
  background: #007082;
  border-color: #007082;
}
</style>
