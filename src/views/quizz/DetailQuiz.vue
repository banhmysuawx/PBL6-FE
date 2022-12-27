<template>
  <el-container class="layout-container-demo">
    <SideBar />
    <el-container>
      <el-header style="height: 50px"><HeaderCompanyView /></el-header>
      <el-container>
        <el-aside style="width: 500px">
          <el-row></el-row>
          <el-row>
            <el-col :span="8" style="font-size: 20px"
              ><b>{{n }} questions</b></el-col
            >
          </el-row>
          <el-row v-for="(item, index) in test.questions" :key="item">
            <el-icon><CloseBold /></el-icon>
            <el-card
              class="box-card"
              style="margin: 0px 10px; background: rgba(139, 196, 71, 0.6)"
              @click="choiceQuestion(item.id)"
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
                    <span style="font-size: 20px"
                      ><b>Information of Test</b></span
                    >
                    <el-button type="primary" @click="CreateNewQuizz()"
                      >Publish</el-button
                    >
                  </div>
                </template>
                <el-row :gutter="20">
                  <el-col :span="8">Name Test</el-col>
                  <el-col :span="16"
                    ><el-input v-model="test.name" placeholder="Please input"
                  /></el-col>
                </el-row>
                <!-- <el-row>
                  <el-col :span="8" style="margin-top: 10px">Category</el-col>
                  <el-col :span="8"
                    ><el-select
                      v-model="test.category"
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
                  </el-col>
                </el-row> -->
                <el-row :gutter="20">
                  <el-col :span="8">Description: </el-col>
                  <el-col :span="16">
                    <el-input
                      v-model="test.description"
                      :rows="2"
                      type="textarea"
                      placeholder="Please input"
                  /></el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="8">Time Limit</el-col>
                  <el-col :span="6">
                    <el-input-number v-model="test.time_limit" :step="15"
                  /></el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">Percent Pass (%)</el-col>
                  <el-col :span="6"
                    ><el-input-number
                      v-model="test.percent_to_pass"
                      :min="0"
                      :max="100"
                      @change="handleChange"
                      :step="10"
                  /></el-col>
                </el-row>
              </el-card>
            </el-row>

             <el-row style="margin: 20px">
              <el-card class="box-card">
                <template #header>
                  <div class="card-header">
                    <span style="font-size: 20px"
                      ><b>Detail of question</b></span
                    >
                  </div>
                </template>

                <el-row>
                  <el-col :span="16"></el-col>
                  <el-col :span="4"
                    ><el-button type="primary" plain @click="clear()"
                      >Clear</el-button
                    >
                   </el-col>
                    <el-col :span="4"
                    >
                    <el-button type="primary" plain @click="addQuestion()"
                      >Add Question</el-button
                    ></el-col
                  >
                </el-row>

                <el-row :gutter="20">
                  <el-col span="4" style="margin-top: 15px; font-size: 20px"
                    >Question:
                  </el-col>
                  <el-col :span="20">
                    <el-input
                      v-model="choice_question.content"
                      :rows="2"
                      type="textarea"
                      placeholder="Please input"
                  /></el-col>
                </el-row>
                <el-radio-group v-model="value_answer.is_check">
                  <el-row v-for="item,index in answers" :key="item">
                    <el-col :span="4">
                      <el-radio :label="index+1" size="large"></el-radio>
                    </el-col>
                    <el-col :span="20">
                      <el-input
                        style="width: 550px"
                        v-model="item.content"
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
  name: "DetailQuizz",
  components: {
    SideBar,
    HeaderCompanyView,
  },
  data() {
    return {
      test : {},
      n : 0,
      len_answer: 3,
      value_answer: {
        question: "",
        value: ["", "", ""],
        is_check: false,
      },
      choice_question:{
      },
      answers :[]
      
  }
},
  mounted() {
    delete axios.defaults.headers.common["Authorization"];
    const id =  this.$route.params.id;
    axios
      .get(`https://api-exam.quangdinh.me/api/v1/test/${id}`)
      .then((response) => {
        this.test = response.data[0]
        console.log(this.test)
        this.n = this.test.questions.length
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    choiceQuestion(id){
      delete axios.defaults.headers.common["Authorization"];
      axios
      .get(`https://api-exam.quangdinh.me/api/v1/test/question/${id}`)
      .then(response=>{
        console.log(response.data[0])
        this.choice_question = response.data[0]
        this.len_answer = this.choice_question.answers.length
        this.answers = this.choice_question.answers
        for (var index =0; index<this.answers.length; index++){
          if (this.answers[index].is_correct){
            this.value_answer.is_check = index+1
            break;
          }
        }
        console.log(this.value_answer.is_check)
      })
      .catch(err=>{
        console.log(err)
      })
    }
  
  },
};
</script>

<style>
@import "../../assets/css/index.css";
</style>
