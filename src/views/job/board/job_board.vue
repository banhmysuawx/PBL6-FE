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
                   
                    <span v-if="applicant.status == 'set_schedule'">
                      Status: Send Interview Schedule
                      <el-button type="primary" style="margin-left: 16px" @click="SetSchedule(applicant)">
                        Set Schedule
                      </el-button>
                    </span>

                    <span v-if="applicant.status == 'interview_pending'">
                      Status: Interview Pending
                      <el-button type="primary" style="margin-left: 16px" @click="ShowSchedule(applicant)">
                        Show Schedule
                      </el-button>
                    </span>

                    <span v-if="applicant.status == 'schedule_interview'">
                      Status: Schedule Interview
                      Official day interview : "26-12-2022"
                    </span>

                    <span v-if="applicant.status == 'cancel_interview'">
                      Status: Cancel Interview
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
      <div>{{applicant_choice.candidate_name}}</div>
      <a :href="applicant_choice.cv">CV: {{applicant_choice.cv}}</a>
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
    <span>Do you mark pass candidate? </span>
    <template #footer>
        <el-button @click="confirmFail = false">Cancel</el-button>
        <el-button type="primary" @click="ChangePass()">
          OK
        </el-button>
    </template>
    </el-dialog>

    <!--Drawer for set schedule-->
    <el-drawer v-model="isSetSchedule" title="Schedule To Interview" size="40%">
     <div style="float:right; margin-bottom: 10px;">
      <el-button type="danger" @click="UpdateApplicantInterview()" v-if="(applicant_choice.status=='interview_pending')">Update</el-button>
      <el-button type="primary" @click="CreateApplicantInterview()" v-else>Save</el-button>
    </div>
      <el-row>
        <el-col :span="8"> 
          <div class="demo-basic--circle" >
            <div class="block" style="margin-top:25px">
                <el-avatar :size="75" :src="circleUrl" />
            </div>
          </div>
          <div>Ngo Nguyen Hoang Dung</div>
        </el-col>
        <el-col :span="16">
          <el-row></el-row>
          <el-row></el-row>
          <span class="demonstration">Set Schedule: </span>
          <el-select v-model="applicant_interview.value_choice_set_schedule" class="m-2" placeholder="Select" size="large" @change="ChangeChoice()">
            <el-option
              v-for="item in choice_set_schedule"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
          <div class="demo-date-picker">
          <div class="block">
            <span class="demonstration">Limited Day:</span>
            <el-date-picker
              v-model="applicant_interview.end_set_schedule_interview"
              type="date"
              placeholder="Pick a day"
              size="default"
              value-format="YYYY-MM-DD"
              style="cursor: pointer;"
            />
          </div>
        </div>
        </el-col>
      </el-row>
    

    <div>
      <div style="padding: 10px;">
        <el-button @click="showPeriodSchedule()">Watch period availabel period</el-button>
        <el-button type="primary" @click="isMyCalendar=true">My Calendar</el-button>
      </div>

      <el-row></el-row>
      <el-row></el-row>
      <span v-for="item,index in list_period_to_schedule" :key="index">
      <el-row v-if="(index % 2)==0">
        <el-col :span="12">
          <el-card class="box-card" style="width: 270px;">
            <template #header>
              <div class="card-header">
                <span>{{list_period_to_schedule[index].day}}</span>
              </div>
            </template>
            <div v-for="period,index1 in list_period_to_schedule[index].available" :key="index1" class="text item">
              <span v-if="(index1 % 2)==0">
              <el-row v-if="applicant_interview.value_choice_set_schedule=='manual'">
                <el-col :span="12">
                  <el-checkbox v-model="check_period_to_schedule[index][index1]" border  size="small"
                  @change="ChoicePeriod(index,index1)" >
                    {{list_period_to_schedule[index].available[index1].start}} - {{list_period_to_schedule[index].available[index1].end}}
                  </el-checkbox>
                </el-col>
                <el-col :span="12" v-if="((index1+1) < list_period_to_schedule[index].available.length)">
                  <el-checkbox  size="small" v-model="check_period_to_schedule[index][index1+1]" border 
                  @change="ChoicePeriod(index,index1+1)" >
                    {{list_period_to_schedule[index].available[index1+1].start}} - {{list_period_to_schedule[index].available[index1+1].end}}
                  </el-checkbox></el-col>
              </el-row>
              <el-row v-else>
                <el-col :span="12"><el-checkbox-button>{{list_period_to_schedule[index].available[index1].start}} - {{list_period_to_schedule[index].available[index1].end}}</el-checkbox-button></el-col>
                <el-col :span="12" v-if="((index1+1) < list_period_to_schedule[index].available.length)"><el-checkbox-button>{{list_period_to_schedule[index].available[index1+1].start}} - {{list_period_to_schedule[index].available[index1+1].end}}</el-checkbox-button></el-col>
              </el-row>
              </span>
            </div>             
          </el-card>
        </el-col>

        <el-col :span="12" v-if="((index+1) < list_period_to_schedule.length)">
          <el-card class="box-card" style="width: 270px;">
            <template #header>
              <div class="card-header">
                <span>{{list_period_to_schedule[index+1].day}}</span>
              </div>
            </template>
            <div v-for="(period,index2) in list_period_to_schedule[index+1].available" :key="index2" class="text item">
              <span v-if="(index2 % 2)==0">
              <el-row v-if="applicant_interview.value_choice_set_schedule=='manual'">
                <el-col :span="12">
                  <el-checkbox  size="small" v-model="check_period_to_schedule[index+1][index2]" border 
                  @change="ChoicePeriod(index+1,index2)">
                    {{list_period_to_schedule[index+1].available[index2].start}} - {{list_period_to_schedule[index+1].available[index2].end}}
                  </el-checkbox>
                </el-col>
                <el-col :span="12" v-if="((index2+1) < list_period_to_schedule[index+1].available.length)">
                  <el-checkbox  size="small" v-model="check_period_to_schedule[index+1][index2+1]" 
                  @change="ChoicePeriod(index+1,index2+1)" border >
                    {{list_period_to_schedule[index+1].available[index2+1].start}} - {{list_period_to_schedule[index+1].available[index2+1].end}}
                  </el-checkbox>
                </el-col>
              </el-row>
              <el-row v-else>
                <el-col :span="12"><el-checkbox-button>{{list_period_to_schedule[index+1].available[index2].start}} - {{list_period_to_schedule[index+1].available[index2].end}}</el-checkbox-button></el-col>
                <el-col :span="12" v-if="((index2+1) < list_period_to_schedule[index+1].available.length)"><el-checkbox-button>{{list_period_to_schedule[index+1].available[index2+1].start}} - {{list_period_to_schedule[index+1].available[index2+1].end}}</el-checkbox-button></el-col>
              </el-row>
            </span>
            </div>        
          </el-card>
        </el-col>
      </el-row>
      </span>

     </div>
  </el-drawer>
  </div>
  </template>
  <script>

  import SideBar from "@/components/SideBar.vue"
  import HeaderCompanyView from "@/components/HeaderCompany.vue"
  import axios from 'axios'
  import '@fullcalendar/core/vdom' 
  import { toast } from 'bulma-toast'

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
          },
          isSetSchedule : false,
          isMyCalendar : false,
          choice_set_schedule : ["automate","manual"],
          applicant_interview: {
            id : 0,
            value_choice_set_schedule : '',
            end_set_schedule_interview : '',
          },
          list_period_to_schedule : [],
          check_period_to_schedule : [],
          period_to_schedule_choices : [],
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
          .get(`/applicants/company/get_all_applicants?company_id=${id_company}&page=1`)
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
        HeaderCompanyView,
      },

      methods:{
      

        initialData(){
          this.applicant_interview = {
            value_choice_set_schedule : '',
            end_set_schedule_interview : '',
          },
          this.list_period_to_schedule = []
          this.check_period_to_schedule = []
          this.period_to_schedule_choices = []
          console.log("aloooo")
          console.log(this.applicant_interview)
        },

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
          console.log("applicant choice")
          console.log(this.applicant_choice)
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
            this.applicants_search = this.applicants
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
            this.applicants_search = this.applicants
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
          
        },

        showPeriodSchedule(){
          console.log(this.applicant_interview)
          axios
          .get(`/applicants/company/applicant-interview/get_time?id_applicant=${this.applicant_choice.id}&limited_day=${this.applicant_interview.end_set_schedule_interview}&choice=${this.applicant_interview.value_choice_set_schedule}`)
          .then(response=>{
            this.list_period_to_schedule = response.data

            for (var i =0;i<this.list_period_to_schedule.length;i++){
              var check = []
              for (var k = 0;k<this.list_period_to_schedule[i].available.length;k++){
                check[k] = 0
              }
              this.check_period_to_schedule[i] = check
            }
           
          })
          .catch(err=>{
            console.log(err)
          })
        },

        SetSchedule(applicant){
          this.initialData();
          this.isSetSchedule = true
          this.applicant_choice = applicant
        },

        async CreateApplicantInterview(){
          var data={}
          if (this.applicant_interview.value_choice_set_schedule=="automate"){
            data = {
            applicant : this.applicant_choice.id,
            choice_set_schedule_interview : this.applicant_interview.value_choice_set_schedule,
            end_set_schedule_interview : this.applicant_interview.end_set_schedule_interview
          }
          } else {
            data = {
            applicant : this.applicant_choice.id,
            choice_set_schedule_interview : this.applicant_interview.value_choice_set_schedule,
            end_set_schedule_interview : this.applicant_interview.end_set_schedule_interview,
            period_time_choice : this.period_to_schedule_choices
          }
          }
          await axios
          .post("/applicants/applicant-interview",data)
          .then(response =>{
            console.log(response.data)
            toast({
                      message : 'Create Interview Schedule Success',
                      type :'is-success',
                      dismissible : true,
                      pauseOnHover :true,
                      duration :2000,
                      position :'bottom-right'
                  })
          this.isSetSchedule=false
          })
          .catch(err =>{
            console.log(err)
          })
        },

        ChoicePeriod(index_parent,index_child){
          console.log("choices")
          if (this.check_period_to_schedule[index_parent][index_child]){
              const item = {
                "day" : this.list_period_to_schedule[index_parent].day,
                "start_time": this.list_period_to_schedule[index_parent].available[index_child].start,
                "end_time": this.list_period_to_schedule[index_parent].available[index_child].end
              }
              this.period_to_schedule_choices.push(item)
          } 
          else 
          {
              var index_find = -1
              for (var index =0;index<this.period_to_schedule_choices.length;index++){
                if (this.list_period_to_schedule[index_parent].day==this.period_to_schedule_choices[index].day &&
                this.list_period_to_schedule[index_parent].available[index_child].start == this.period_to_schedule_choices[index].start_time &&
                this.list_period_to_schedule[index_parent].available[index_child].end == this.period_to_schedule_choices[index].end_time ){
                  index_find = index;
                  break;
                }
              }
              if (index_find!=-1){
                this.period_to_schedule_choices.splice(index_find,1)
              }
          }
        },

        async ShowSchedule(applicant){
          this.initialData();
          this.applicant_choice = applicant
          await axios
          .get(`/applicants/company/applicant-interview/get_applicant_interview_by_applicant?id_applicant=${applicant.id}`)
          .then(response =>{
            this.applicant_interview.value_choice_set_schedule = response.data.choice_set_schedule_interview
            this.applicant_interview.end_set_schedule_interview = response.data.end_set_schedule_interview
            this.applicant_interview.id = response.data.id

          })
          .catch(err=>{
            console.log(err)
          })
          
          if (this.applicant_interview.value_choice_set_schedule=="automate"){
             await  axios
                .get(`/applicants/company/applicant-interview/get_time?id_applicant=${this.applicant_choice.id}&limited_day=${this.applicant_interview.end_set_schedule_interview}&choice=${this.applicant_interview.value_choice_set_schedule}`)
                .then(response=>{
                  this.list_period_to_schedule = response.data
                  this.isSetSchedule = true
                })
                .catch(err=>{
                  console.log(err)
                })
            } else if (this.applicant_interview.value_choice_set_schedule=="manual"){
              await axios
              .get(`/applicants/company/period-interview/get_period_by_interview_manual?id_applicant_interview=${this.applicant_interview.id}`)
              .then(response =>{
                this.list_period_to_schedule = response.data
                for (var i =0;i<this.list_period_to_schedule.length;i++){
                  var check = []
                  for (var k = 0;k<this.list_period_to_schedule[i].available.length;k++){
                    check[k] = true
                  }
                  this.check_period_to_schedule[i] = check
                }
                this.isSetSchedule = true
              })
              .catch(err=>{
                  console.log(err)
              })
            }

        },

        async UpdateApplicantInterview(){
          var data={}
          if (this.applicant_interview.value_choice_set_schedule=="automate"){
            data = {
            choice_set_schedule_interview : this.applicant_interview.value_choice_set_schedule,
            end_set_schedule_interview : this.applicant_interview.end_set_schedule_interview
          }
          } else {
            data = {
            choice_set_schedule_interview : this.applicant_interview.value_choice_set_schedule,
            end_set_schedule_interview : this.applicant_interview.end_set_schedule_interview,
            period_time_choice : this.period_to_schedule_choices
          }
          }

          await axios
          .patch(`/applicants/applicant-interview/${this.applicant_interview.id}`,data)
          .then(response =>{
            console.log("update nhe")
            console.log(response.data)
            toast({
                      message : 'Update Interview Schedule Success',
                      type :'is-success',
                      dismissible : true,
                      pauseOnHover :true,
                      duration :2000,
                      position :'bottom-right'
                  })
          this.isSetSchedule=false
          })
          .catch(err =>{
            console.log(err)
          })
        },
        ChangeChoice(){
          console.log("change choice")
          console.log(this.applicant_interview.value_choice_set_schedule)
          if (this.list_period_to_schedule.length > 0 && this.applicant_interview.value_choice_set_schedule=='manual'){
            for (var i =0;i<this.list_period_to_schedule.length;i++){
                  var check = []
                  for (var k = 0;k<this.list_period_to_schedule[i].available.length;k++){
                    check[k] = false
                  }
                  this.check_period_to_schedule[i] = check
                }
          }
        }
      }
  }
  </script>
  
  <style lang="scss">
  @import  "../../../assets/css/index.css";
  @import "./index.scss"

  </style>