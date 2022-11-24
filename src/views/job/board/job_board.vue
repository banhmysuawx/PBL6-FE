<template>
    <div >
    <el-container class="layout-container-demo">
      <SideBar/>
      <el-container>
          <el-header style="height:50px"><HeaderCompanyView/></el-header>
          <el-container>
            <el-aside >
              <el-row style="margin: 10px 0px">
                <el-input
                  v-model="text_search_job"
                  placeholder="Please input"
                  class="input-with-select"
                  @keyup="searchJob()"
                >
                  <template #prepend>
                    <el-icon color="blue"><Search /></el-icon>
                  </template>
                </el-input>
              </el-row>
                    <ul v-infinite-scroll="load" class="infinite-list infinite-list-scroll" style="height: 100%;cursor: pointer;">
                      <li v-for="item,index in jobs_search" :key="item.id" class="infinite-list-item infinite-list-scroll-item" :class="{ active: isActive[index] }" @click="ShowApplicant(item,index)">
                            <el-row style=" margin:5px 0px">{{item.name}}</el-row>
                            <el-row style="margin:5px 0px; width: 300px;">
                              <el-col :span="14"><el-button type="primary" plain style="border-radius: 20px;">{{item.category_name}}</el-button></el-col>
                              <el-col :span="10"><el-button type="primary" plain style="border-radius: 20px">{{item.created_at}}</el-button></el-col>
                            </el-row>
                        </li>
                    </ul>
            </el-aside>
            <el-main>
              <div>
                <el-row style="margin:5px 10px; font-size:30px">{{job_current.name}}</el-row>
                <el-row style="margin:5px 10px; font-size:15px" >{{job_current.number_applicants_search}} Candidates</el-row>
              </div>

              <el-row v-if="job_current.number_applicants>0">
                <el-col :span="10">
                  <el-select v-model="value" placeholder="Sort By" >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-col>
                <el-col :span="10">
                  <el-input
                  v-model="text_search_applicant"
                  placeholder="Please input"
                  class="input-with-select"
                  @keyup="searchApplicant()"
                >
                  <template #prepend>
                    <el-icon color="blue"><Search /></el-icon>
                  </template>
                </el-input>
              </el-col>
              <el-col :span="4">
                <el-popover placement="right" :width="400" trigger="click">
                  <template #reference>
                    <el-button style="margin-right: 16px">Filter</el-button>
                  </template>
                  <el-form>
                    <el-form-item  class="item-form">
                      <el-row :gutter="20">
                        <el-col :span="8"><label>Name</label></el-col>
                        <el-col :span="16"> <el-input v-model="data_filter.name"/></el-col>
                      </el-row>
                    </el-form-item>
                    <el-form-item class="item-form">
                      <el-row :gutter="20">
                      <el-col :span="6"><label>Apply On</label></el-col>
                      <el-col :span="10">  <el-date-picker
                          v-model="data_filter.apply_on"
                          type="date"
                          placeholder="Pick a day"
                        />
                      </el-col>
                      <el-col :span="8">
                      <el-select v-model="data_filter.limit_apply_on">
                        <el-option label="Exactly" value="1" />
                        <el-option label="At Least" value="2" />
                        <el-option label="At Most" value="3" />
                      </el-select>
                      </el-col>
                      </el-row>
                    </el-form-item>
                    <el-form-item class="item-form">
                      <el-row :gutter="20">
                      <el-col :span="6"><label>Test (%)</label></el-col>
                      <el-col :span="6"> <el-input v-model="data_filter.result_test"/></el-col>
                      <el-col :span="12">
                      <el-select v-model="data_filter.limit_result_test">
                        <el-option label="Exactly" value="1" />
                        <el-option label="At Least" value="2" />
                        <el-option label="At Most" value="3" />
                      </el-select>
                      </el-col>
                      </el-row>
                    </el-form-item>
                    <el-form-item class="item-form">
                      <el-row :gutter="20">
                        <el-col :span="7"><label>Result</label></el-col>
                        <el-col :span="16"> 
                          <el-select v-model="data_filter.result" >
                            <el-option label="Inprogress" value="1" />
                            <el-option label="Pass" value="2" />
                            <el-option label="Fail" value="3" />
                          </el-select>  
                        </el-col>
                      </el-row>
                     
                    </el-form-item>
                    <el-row style="float:right">
                      <el-button type="primary">Filter</el-button>
                    </el-row>
                  </el-form>
                </el-popover>
              </el-col>
              </el-row>
                <el-row  class="el-row-class" v-for="applicant in applicants_search" :key="applicant.id">
                  <el-col :span="8" class="demo-avatar demo-basic el-col-avatar">
                    <div class="demo-basic--circle" >
                      <div class="block" style="margin-top:25px">
                        <el-avatar :size="100" :src="circleUrl" />
                      </div>
                    </div>
                    <div class="block el-col-sub-item">
                       <div class="el-col-item"><el-icon v-if="applicant.status == 'apply'" color="green" size="20px"><Select /></el-icon></div>
                       <div class="el-col-item">{{applicant.candidate_name}}</div>
                       <div class="el-col-item">Apply on: {{applicant.apply_format_day}}</div>
                       <div style="margin:5px 10px"><el-button type="primary" plain @click="showDetailCandidate(applicant)">Detail</el-button></div>
                    </div>
                  </el-col>
                  <el-col :span="5" class="el-col-sub-item">
                  <div style="text-decoration:underline;"><el-icon v-if="applicant.status == 'test'" color="green" size="20px"><Select /></el-icon><b>  Do Test</b></div>
                  <span v-if="applicant.status_do_test_date != null">
                  <div class="el-col-item">Time start test: {{applicant.test_format_day}}</div>
                  <div class="el-col-item">Time end test: {{applicant.expired_format_day}} </div>
                  <div class="el-col-item"><el-progress :text-inside="true" :stroke-width="20" :percentage="applicant.result" style="width:150px" />
                
                  </div>  
                  </span>                
                  </el-col>
                  <el-col :span="7" class="el-col-sub-item">
                    <div style="text-decoration:underline;"><b>Interview</b></div>
                    <span v-if="applicant.status_interview_date != null">
                    <div class="el-col-item">Time Interview: {{applicant.status_interview_date}}</div>
                    <div class="el-col-item">Link gg meet: </div>
                   
                    <el-row>
                      <el-col :span="8"></el-col>
                      <el-col :span="8"><el-progress :text-inside="true" :stroke-width="20" :percentage="0" /></el-col>
                      <el-col :span="8"></el-col>
                    </el-row>
                    </span>
                  </el-col>
                  <el-col :span="3" style="background: white;margin:0px 2px;">
                    <div style="text-decoration:underline;"><el-icon v-if="applicant.status == 'complete' || applicant.status == 'incomplete'" color="green" size="20px"><Select /></el-icon><b>Result</b></div>
                    <el-result
                        icon="success"
                        v-if="applicant.status=='complete'"
                      >
                    </el-result>
                    <el-result
                        icon="error"
                        v-else-if="applicant.status=='incomplete'"
                      >
                    </el-result>
                  </el-col>
              </el-row>
            </el-main>   
          </el-container>    
     </el-container>
    </el-container>

    <!--Detail Candidate-->
    <el-drawer v-model="drawerDetailCandidate" :direction="direction">
    <template #title>
      <h4>Candidate Information</h4>
    </template>
    <template #default>
     <div>
      <div class="demo-basic--circle" >
                      <div class="block" style="margin-top:25px">
                        <el-avatar :size="50" :src="circleUrl" />
                      </div>
      </div>
      <div>{{applicant_choice.seeker_name}}</div>
      <div>CV: {{applicant_choice.cv}}</div>
     </div>

     <div style="margin:20px 0px">
      <el-row><div style="float:left;margin:5px; font-size: 20px;">Job Expirences</div></el-row>
      <el-row>
      <div>
      <el-timeline>
        <el-timeline-item
          v-for="expirence in expirences"
          :key="expirence.id"
          type="primary"
          size="large"
          hollow="true"
          :timestamp="expirence.start_date"
          >
          {{expirence.job_title}}
        </el-timeline-item>
      </el-timeline>
      </div>
      </el-row>
     </div>

     <div style="margin:20px 0px">
      <el-row><div style="float:left;margin:5px; font-size: 20px;">Skills</div></el-row>
      <el-row>
      <div>
      <el-timeline>
        <el-timeline-item
          v-for="skill in skills"
          :key="index"
          type="primary"
          size="large"
          hollow="true"
          :timestamp="skill.skill_level"
          >
          {{skill.skill_name}}
        </el-timeline-item>
      </el-timeline>
      </div>
      </el-row>
     </div>

     <div style="margin:20px 0px">
      <el-row><div style="float:left;margin:5px; font-size: 20px;">Education & Achievement</div></el-row>
      <el-row>
      <div>
      <el-timeline>
        <el-timeline-item
          v-for="education in educations"
          :key="index"
          type="primary"
          size="large"
          hollow="true"
          :timestamp = "education.completion_date"
          >
          {{education.certificate_degree_name}}
          <span v-if="education.gpa > 0"> - gpa : {{education.gpa}}</span>
        </el-timeline-item>
      </el-timeline>
      </div>
      </el-row>
     </div>

    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="drawerDetailCandidate=false">Cancel</el-button>
        <el-button type="danger" @click="confirmFail=true" v-if="applicant_choice.status=='apply'">Fail</el-button>
        <el-button type="primary" @click="confirmPass=true" v-if="applicant_choice.status =='apply'">Pass</el-button>
      </div>
    </template>
  </el-drawer>
  
  <!-- Dialog confirm mark fail candidate-->
  <el-dialog
    v-model="confirmFail"
    title="Tips"
    width="30%"
    :before-close="handleClose"
  >
    <span>Do you mark fail candidate? </span>
    <template #footer>
        <el-button @click="confirmFail = false">Cancel</el-button>
        <el-button type="primary" @click="ChangeFail()">
          OK
        </el-button>
    </template>
  </el-dialog>

   <!-- Dialog confirm mark pass candidate-->
   <el-dialog
    v-model="confirmPass"
    title="Tips"
    width="30%"
    :before-close="handleClose"
  >
    <span>Do you mark fail candidate? </span>
    <template #footer>
        <el-button @click="confirmFail = false">Cancel</el-button>
        <el-button type="primary" @click="ChangePass()">
          OK
        </el-button>
    </template>
  </el-dialog>
  </div>
  </template>
  
  <script>

  import SideBar from "@/components/SideBar.vue"
  import HeaderCompanyView from "@/components/HeaderCompany.vue"
  import axios from 'axios'
  
  export default {
      name : "JobBoard",
      data(){
        return{
          drawerDetailCandidate: false,
          circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          jobs : [],
          text_search_job  : "",
          jobs_search:[],
          applicants : [],
          skills :[],
          educations:[],
          expirences:[],
          applicant_choice : "",
          confirmFail :false,
          confirmPass : false,
          id_job_current:0,
          job_current: {},
          isActive : [],
          text_search_applicant : "",
          applicants_search: [],
          data_filter: {
            name :'',
            apply_on :'',
            limit_apply_on : 1,
            result_test : 0,
            limit_result_test : 1,
            result :1
          }
         
        }
      },
      async mounted(){
        const id = this.$store.state.company.id

        await axios
        .get(`/jobs/company/get_jobs?company_id=${id}`)
        .then(response =>{
          this.jobs = response.data
          this.jobs_search = this.jobs
        })
        .catch(err=>{
          console.log(err)
        })

        for (var i=0;i<this.jobs_search.length;i++){
          this.isActive[i] = false
        }
        const id_company = this.$store.state.company.id
        await axios
          .get(`/applicants/company/get_all_applicants?company_id=${id_company}`)
          .then(response=>{
            this.applicants = response.data
            this.applicants_search = this.applicants
            this.job_current['number_applicants'] = this.applicants.length
            this.job_current['number_applicants_search'] = this.applicants.length

          })
          .catch(err =>{
            console.log(err)
          })

      },

      components:{
        SideBar,
        HeaderCompanyView
      },
      methods:{
        blurLocation(){
          console.log("hello")
        },
        async searchJob(){
          this.jobs_search = this.jobs.filter(item => item.name.toLowerCase().includes(this.text_search_job.toLowerCase()))
        },

        async searchApplicant(){
          this.applicants_search = this.applicants.filter(item => item.candidate_name.toLowerCase().includes(this.text_search_applicant.toLowerCase()))
          this.job_current['number_applicants_search'] = this.applicants_search.length 
        },

        async ShowApplicant(item,index){
          for (var i=0;i<this.jobs_search.length;i++){
            this.isActive[i] = false
          }
          this.isActive[index]=true

          this.id_job_current = item.id
          this.job_current = item
          await axios
          .get(`/applicants/company/get_applicant?id_job=${item.id}`)
          .then(response=>{
            this.applicants = response.data
            this.applicants_search = this.applicants
            this.job_current['number_applicants'] = this.applicants.length
            this.job_current['number_applicants_search'] = this.applicants.length
          })
          .catch(err =>{
            console.log(err)
          })
        },

        async showDetailCandidate(applicant){
          this.applicant_choice = applicant
          await axios
            .get(`/seekers/profile-education?seeker_id=${applicant.seeker_id}`)
              .then(response =>{
                this.educations = response.data
              })
              .catch(err=>{
                console.log(err)
              })
          await axios
              .get(`/seekers/profile-expirence?seeker_id=${applicant.seeker_id}`)
              .then(response =>{
                this.expirences = response.data
              })
              .catch(err=>{
                console.log(err)
              })
          await axios
              .get(`/seekers/profile-skill?seeker_id=${applicant.seeker_id}`)
              .then(response =>{
                this.skills = response.data
              })
              .catch(err=>{
                console.log(err)
              })
          
          this.drawerDetailCandidate = true
        },

        async ChangeFail(){
          const form={
            status : 'incomplete'
          }
          await axios
          .patch(`/applicants/applicant/${this.applicant_choice.id}`,form)
          .then(response =>{

          })
          .catch(err =>{

          })

          await axios
          .get(`/applicants/company/get_applicant?id_job=${this.id_job_current}`)
          .then(response=>{
            this.applicants = response.data
            this.confirmFail = false
            this.drawerDetailCandidate=false
            toast({
                      message : 'Mark Fail successful',
                      type :'is-success',
                      dismissible : true,
                      pauseOnHover :true,
                      duration :2000,
                      position :'bottom-right'
                  })
          })
          .catch(err =>{
            console.log(err)
          })
          
        },

        async ChangePass(){
          const form={
            status : 'test'
          }
          await axios
          .patch(`/applicants/applicant/${this.applicant_choice.id}`,form)
          .then(response =>{

          })
          .catch(err =>{

          })

          await axios
          .get(`/applicants/company/get_applicant?id_job=${this.id_job_current}`)
          .then(response=>{
            this.applicants = response.data
            this.confirmPass = false
            this.drawerDetailCandidate=false
            toast({
                      message : 'Mark Pass successful',
                      type :'is-success',
                      dismissible : true,
                      pauseOnHover :true,
                      duration :2000,
                      position :'bottom-right'
                  })
          })
          .catch(err =>{
            console.log(err)
          })
          
        }
      }
  }
  </script>
  
  <style lang="scss">
  @import  "../../../assets/css/index.css";
  @import "./index.scss"

  </style>