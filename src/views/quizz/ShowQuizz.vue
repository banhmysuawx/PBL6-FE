<template>
    <el-container class="layout-container-demo" >
       <SideBar/>
     <el-container>
       <el-header style="height:50px;"><HeaderCompanyView/></el-header>
       <el-container>
           <el-main>
               <div class="main-container">
                <el-row style="margin:20px">
                    <el-col :span="24"><el-button class="button" type="primary" @click="CreateNewQuizz()">Create New Quizz</el-button></el-col>
                </el-row>
                <el-row :gutter="20" style="margin:20px" v-for="index in n" >
                    <el-col :span="8" v-for ="i in 3">
                        <el-card class="box-card" v-if="((index-1)*3+i-1) < this.list_quiz.length" style="height:370px">
                            <template #header>
                            <div class="card-header" style="background-color: rgba(121, 173, 132, 0.6); height: 30px;">
                                <span>{{list_quiz[(index-1)*3+i-1].name}}</span>
                            </div>
                            </template>
                            <el-row>
                                <el-col :span="6"><b><el-icon size="15px"><AlarmClock /></el-icon> :</b></el-col>
                                <el-col :span="6"> {{list_quiz[(index-1)*3+i-1].time_limit}} min</el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="6"><b>Category: </b></el-col>
                                <el-col :span="8"> Development</el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="6"><b>Total: </b></el-col>
                                <el-col :span="8"> {{list_quiz[(index-1)*3+i-1].questions.length }} questions</el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="6"><b>Descripion: </b></el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="6">
                                </el-col>
                                <el-col>
                                    {{list_quiz[(index-1)*3+i-1].description}}
                                </el-col>
                            </el-row>
                            <el-row style="margin:10px"><el-button type="primary" plain @click="DetailQuiz(list_quiz[(index-1)*3+i-1].id)">Detail</el-button></el-row>
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
            <el-col :span="8" style="margin-top:10px; text-align: left;" >Name Quizz</el-col>
            <el-col :span="16"><el-input v-model="input" placeholder="Please input" /></el-col>
        </el-row>
        <el-row>
            <el-col :span="7" style="margin-top:10px;  text-align: left;">Category</el-col>
            <el-col :span="15"><el-select v-model="value" class="m-2" placeholder="Select">
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
            <el-col :span="8" style="text-align: left;">Percent Pass (%)</el-col>
            <el-col :span="7"><el-input-number v-model="num" :min="1" :max="10" @change="handleChange" /></el-col>
        </el-row>
        <el-row>
            <el-col :span="8" style="text-align: left;">Time Limit</el-col>
            <el-col :span="7"><el-input-number v-model="num" :min="1" :max="10" @change="handleChange" /></el-col>
        </el-row>
        <el-row>
            <el-col :span="8" style="text-align: left;">Description</el-col>
        </el-row>
        <el-row>
                <el-input
                style="height:100px"
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
                <el-button type="primary" style="width: 100px; float: right;">Next</el-button>
            </el-col>
        </el-row>
    </el-drawer>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import HeaderCompanyView from "@/components/HeaderCompany.vue"
import axios from 'axios'

export default {
   name: "ShowQuizz",
   components: {
     SideBar,
     HeaderCompanyView,
   },
   data(){
       return{
        drawCreateNewQuiz : false,
        list_quiz : [],
        n :0,
       }
   },
   mounted(){
    delete axios.defaults.headers.common["Authorization"];
     axios
        .get("https://api-exam.quangdinh.me/api/v1/test")
        .then(response =>{
            this.list_quiz = response.data
            console.log("hellooooooo")
            console.log(response.data)
            if (this.list_quiz.length %3 == 0)
                this.n = Math.floor(this.list_quiz.length/3)
            else this.n = Math.floor(this.list_quiz.length/3)+1
            console.log(this.n)
        })
        .catch(err=>{
            console.log(err)
        })
   },
   methods :{
    CreateNewQuizz(){
        this.$router.push({ name: "create-quizz" });
    },
    DetailQuiz(id){
        this.$router.push({path: `/company/quizz/${id}` });
    }
   },
}
</script>

<style>
@import "../../assets/css/index.css";

</style>