<template>
  <div>
    <el-container class="layout-container-demo">
      <SideBar />
      <el-container>
        <el-header style="height: 50px"><HeaderCompanyView /></el-header>
        <el-main>
          <div class="main-container">
            <el-row>
              <el-col :span="1"></el-col>
              <el-col :span="8" style="font-size: 25px"
                >Welcome, Hoang Dung</el-col
              >
            </el-row>
            <el-row :gutter="20" style="margin: 20px">
              <el-col :span="8">
                <el-card class="box-card">
                  <template #header> 
                      <el-button class="button" type="primary"
                        >Applicants</el-button
                      >
                  </template>
                  <el-row>
                  <el-col :span="10"><el-icon size="100px" color="blue"><Document /></el-icon></el-col>
                  <el-col :span="10" style="font: italic 3.5em 'Fira Sans', serif;"><b>{{applicants.length}} </b></el-col>
                 </el-row>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card class="box-card">
                  <template #header>
                    <el-button class="button" type="primary"
                        >Jobs</el-button
                      >
                  </template>
                 <el-row>
                  <el-col :span="10"><el-icon size="100px" color="yellow"><Opportunity /></el-icon></el-col>
                  <el-col :span="10" style="font: italic 3.5em 'Fira Sans' ,serif;"><b>{{jobs.length}} </b></el-col>
                 </el-row>
                </el-card>
              </el-col>
              

              <el-col :span="8">
                <el-card class="box-card">
                  <template #header>
                    <el-button class="button" type="primary"
                        >Candidate</el-button
                      >
                  </template>
                  <el-row>
                  <el-col :span="10"><el-icon size="100px" color="blue"><User /></el-icon></el-col>
                  <el-col :span="10" style="font: italic 3.5em 'Fira Sans',serif;"><b>{{ candidates.length }} </b></el-col>
                 </el-row>
                </el-card>
              </el-col>
            </el-row>
          
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

export default {
  name: "Dashboard",

  data() {
    return {
      jobs : [],
      applicants :[],
      candidates:[]
          
  }},
  components: {
    SideBar,
    HeaderCompanyView
  },
  created(){
    const id = this.$store.state.company.id;
    axios
    .get(`/jobs/company/get_jobs?company_id=${id}`)
    .then(res=>{
      this.jobs = res.data
    })
    .catch(err=>{
      console.log(err)
    })

    axios
    .get(`/applicants/company/get_all_applicants?company_id=${id}`)
    .then(res=>{
      this.applicants = res.data
    })
    .catch(err=>{
      console.log(err)
    })

    axios
    .get(`/applicants/company/get_all_candidate?company_id=${id}`)
    .then(res=>{
      this.candidates = res.data
    })
    .catch(err=>{
      console.log(err)
    })
  }
};
</script>

<style lang="scss">
@import "index.scss";
</style>
