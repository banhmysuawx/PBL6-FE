<template>
  <div>
   <el-container class="layout-container-demo" >
      <SideBar/>
      <el-container> 
              <el-header style="height:50px;"><HeaderCompanyView/></el-header>
               <div style="height:30px; text-align:left; transform: translateY(30%);">
                   <span style="margin-left:20px; "><b>Home - Job</b></span>
              </div>
          <el-container>
                   <el-main style="display: flex;flex-direction: column;">
                    <el-row>
                      <el-col :span="22">
                      <div class="button-add-job">
                          <el-button type="primary" @click="addNewJob()">Add New Job</el-button>
                      </div>
                      </el-col>
                    </el-row>
  
                      <div class="main-container" style="display:flex;flex-direction:column">
                          <el-row v-for="item,index in list_category" :key="index">
                              <el-col :span="2"></el-col>
                              <el-col :span="20">
                                  <div class="job-category">
                                      <el-card class="box-card">
                                      <template #header>
                                          <el-row style="float: right;"><el-button text style="height:15px;background:white" @click="toggleConfirmDelete(item)"><el-icon><Close /></el-icon></el-button></el-row>
                                      </template>
                                      <el-collapse v-model="activeNames">
                                          <el-collapse-item name="1" style="box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);">
                                              <template #title>
                                                  <div class="title" >{{item.category.name}} <el-button text style="height:15px;background:white"><el-icon :size="14" @click.stop="OpenDialogEditNameCategory(item.category)"><EditPen /></el-icon></el-button></div>
                                              </template>
                                         
                                              <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
                                                  <li v-for="job in item.jobs" :key="job.id" class="infinite-list-item" >
                                                      <div class="job-item" >
                                                          <el-row style="margin-top:10px;margin-bottom: 7px;">
                                                              <el-col :span="12" style="cursor:pointer; text-align:left">{{job.name}}</el-col>
                                                              <el-col :span="12" style="text-align:right" >  <el-switch size="small" v-model="job.is_active" class="ml-2" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" @change="PublishJob(job.id,job.is_active)"/></el-col>
                                                          </el-row>
                                                          <el-row>
                                                              <el-col :span="8" v-if="job.locations.length>0"><el-icon color="red"><location /></el-icon>{{job.locations_name[0]}}</el-col>
                                                              <el-col :span="8" v-else><el-icon color="red"><location /></el-icon>No Assigned Location</el-col>
                                                              <el-col :span="8" style="text-align:center">10 candidates apply</el-col>
                                                              <el-col :span="8" style="text-align:right">
                                                                  <el-button link><Edit style="width: 1em; height: 1em; margin-left: 10px" color="blue" /></el-button>
                                                                  <el-button link @click="outerVisible = true"><Delete style="width: 1em; height: 1em; margin-left : 5px" color="black" /></el-button>
                                                              </el-col>
                                                          </el-row>
                                                      
                                                      </div>
                                                  </li>
                                              </ul>
                                              
                                          </el-collapse-item>
                                          </el-collapse>
                                      </el-card>
                                  </div>
                              </el-col>
                              <el-col :span="2"></el-col>
  
                          </el-row>                      
                      </div>          
                  </el-main>  
                  <el-dialog
     v-model="dialogVisible"
     
    >
    <div>
      <el-radio-group v-model="radio1">
        <el-radio label="1" size="large" border>Add New Category</el-radio>
        <el-radio label="2" size="large" border>Add New Job</el-radio>
      </el-radio-group>
    </div>
  
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="CreateJob()">Create</el-button>
        </span>
      </template>
    </el-dialog>
  
    <el-dialog
    v-model="dialogVisible1"
      width="30%"
    >
    <el-form>
      <el-form-item>
          <el-col :span="2">
              <label>Name</label>
          </el-col>
          <el-col :span="8">
              <el-input placeholder="Please enter category name " v-model="category_name" ></el-input>
          </el-col>
      </el-form-item>
    </el-form>
  
      <template #footer>
        <span class="dialog-footer" style="text-align: left;">
          <el-button @click="dialogVisible1 = false">Cancel</el-button>
          <el-button type="primary" @click="createCategory()">
            Save
          </el-button>
        </span>
      </template>
    </el-dialog>
  
    <el-dialog
    v-model="dialogVisibleEditCategory"
      width="30%"
    >
    <el-form>
      <el-form-item>
          <el-col :span="2">
              <label>Name</label>
          </el-col>
          <el-col :span="8">
              <el-input v-model="edit_category.name" ></el-input>
          </el-col>
      </el-form-item>
    </el-form>
  
      <template #footer>
        <span class="dialog-footer" style="text-align: left;">
          <el-button @click="dialogVisibleEditCategory = false">Cancel</el-button>
          <el-button type="primary" @click="editCategory(edit_category)">
            Save
          </el-button>
        </span>
      </template>
    </el-dialog>
  
          </el-container>     
     </el-container>
     </el-container>
  
  
  
      <el-dialog v-model="dialogVisible2" width="60%">
          <el-form>
              <el-row><b>Information Detail</b></el-row>
              <el-form-item>
                  <el-col :span="8"><label>Job Name</label></el-col>
                  <el-col :span="16"><el-input placeholder="Please enter job name " v-model="job.name" ></el-input></el-col>
              </el-form-item>
                  
              <el-form-item>
                  <el-col :span="8"><label>Job Category</label></el-col>
                  <el-col :span="6">
                      <el-select v-model="job.category" placeholder="----Select Category----">
                          <el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item.id" />
                      </el-select>
                  </el-col>
              </el-form-item>
  
              <el-form-item>
                  <el-col :span="8"><label>Description</label></el-col>
                  <el-col :span="16"><el-input type="textarea" placeholder="Please input description" v-model="job.description"></el-input></el-col>
              </el-form-item>
  
              <el-form-item>
                  <el-col :span="8"><label>Salary</label></el-col>
                  <el-col :span="16"><el-input placeholder="Upto 1000$ " v-model="job.salary"></el-input></el-col>
              </el-form-item>
  
              <el-form-item>
                  <el-col :span="8"><label>Location</label></el-col>
                  <el-col :span="16">
                  <el-card class="box-card">
                      <template #header>
                          <div class="card-header">
                              <div style="display: inline-block; margin-left: 20px">
                              <el-select
                                  v-model="job.locations"
                                  filterable
                                  placeholder="Please enter a keyword"
                                  style="width:400px"
                              >
                                  <el-option
                                      v-for="item in locations"
                                      :key="item.id"
                                      :label="item.location_name"
                                      :value="item.id"
                                  >
                                  <el-checkbox v-model="check_location[item.id].value" :label="item.location_name" size="small" @change="choiceLocations(item.id)"/>
                                  </el-option>
                              </el-select>
                              </div>
                          </div>
                      </template>
                  <div class="location-item">
                      <el-row v-for="item in choice_locations" :key="item.id">
                          <el-col :span="2"><el-icon color="red"><location /></el-icon></el-col>
                          <el-col :span="20">{{item.location_name}}</el-col>
                          <el-col :span="2"><el-button link @click="DeleteLocation(item.id)"><Delete style="width: 1em; height: 1em; margin-left : 5px" /></el-button></el-col>
                      </el-row>
                  </div>
                  </el-card>
                  </el-col>
              </el-form-item>
  
              <el-form-item>
                  <el-col :span="8"><label>Skills</label></el-col>
                  <el-col :span="16">
                  <el-card class="box-card">
                      <template #header>
                          <div class="card-header">
                              <div style="display: inline-block; margin-left: 20px">
                              <el-select
                                  v-model="job.skills"
                                  filterable
                                  placeholder="Please enter a keyword"
                                  style="width:400px"
                              >
                                  <el-option
                                      v-for="item in skills"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value"
                                  >
                                  <el-checkbox v-model="check_skill[item.id].value" :label="item.name" size="small" @change="choiceSkill(item.id)"/>
                                  </el-option>
                              </el-select>
                              </div>
                          </div>
                      </template>
                  <div class="location-item">
                      <el-row v-for="item in choice_skills" :key="item.id">
                          <el-col :span="2"><el-icon color="blue"><User /></el-icon></el-col>
                          <el-col :span="20">{{item.name}}</el-col>
                          <el-col :span="2"><el-button link @click="DeleteSkill(item.id)"><Delete style="width: 1em; height: 1em; margin-left : 5px" /></el-button></el-col>
                      </el-row>
                  </div>
                  </el-card>
                  </el-col>
              </el-form-item>
  
              <el-row><b>Information Test</b></el-row>
  
              <el-form-item>
                  <el-col :span="8"><label>Expected Result Test</label></el-col>
                  <el-col :span="16"><el-input placeholder="80%" v-model="job.expected_result_test"></el-input></el-col>
              </el-form-item>
  
              <el-form-item>
                  <el-col :span="8"><label>Limit day do test</label></el-col>
                  <el-col :span="5"><el-input-number :min="1" :max="10" @change="handleChange" v-model="job.limited_day_do_test" /></el-col>
              </el-form-item>
  
              <el-form-item>
                  <el-col :span="8"><label>Limit day confirm schedule</label></el-col>
                  <el-col :span="5"><el-input-number :min="1" :max="10" v-model="job.limited_day_confirm_schedule"/></el-col>
              </el-form-item>
  
              <el-form-item>
                  <el-col :span="21"><el-checkbox v-model="job.is_company_hidden_name" label="Company Name Hide" size="large" /></el-col>
              </el-form-item>
          </el-form>
          <template #footer>
          <span class="dialog-footer">
              <el-button @click="dialogVisible2 = false">Cancel</el-button>
              <el-button type="primary" @click="CreatePostJob()">
              Save
              </el-button>
              <el-button type="primary" @click="dialogVisible2 = false">
              Publish
              </el-button>
          </span>
          </template>
      </el-dialog>
  
    <el-dialog v-model="dialogDelete" title="Confirm Delete">
              <slot>
                <h3 class="text-center">
                  Do you want to remove?
                </h3>
                <div class="text-center">
                  <el-button type="danger" class="mt-3" @click="deleteCategory()">
                    Delete
                  </el-button>
                  <el-button type="primary" class="mt-3" >
                    Cancel
                  </el-button>
                </div>
              </slot>
    </el-dialog>
   
    </div>
  
   
  
  </template>
  
  <script>
  import SideBar from "@/components/SideBar.vue"
  import HeaderCompanyView from "@/components/HeaderCompany.vue"
  import axios from 'axios'
  import { toast } from 'bulma-toast'
  export default {
      name : "ViewJob",
      data(){
          return{
              dialogVisible : false,
              dialogVisible1: false,
              dialogVisible2: false,
              dialogDelete : false,
              dialogVisibleEditCategory: false,
              radio1 : '1',
              locations : [],
              check_location :[],
              choice_locations : [],
              ids_locations :[],
              skills : [],
              check_skill :[],
              choice_skills : [],
              ids_skill : [],
              count :10,
              value2 : true,
              list_category : [],
              category_name : '',
              category_delete : {},
              categories : [],
              edit_category:{
                  id:0,
                  name:""
              },
              job:{
                  name : '',
                  category: 1 ,
                  description:'',
                  salary : '',
                  is_company_hidden_name : false,
                  expected_result_test : 0,
                  limited_day_confirm_schedule:0,
                  limited_day_do_test : 0
              }
          }
      },
      components:{
          SideBar,
          HeaderCompanyView
      },
     
      async mounted() {
          const id = this.$store.state.company.id
          await axios
              .get(`/jobs/company/get_category_and_job?company_id=${id}`)
              .then(response =>{
                  this.list_category = response.data
                  console.log("heleo")
                  console.log(this.list_category)
              })
              .catch(err=>{
                  console.log(err)
              })
          await  axios
              .get(`/jobs/company/get_category?company_id=${id}`)
              .then(response => {
                  this.categories = response.data
              })
              .catch(err => {
                  return err
              })
          
          await axios
              .get(`/jobs/company/get_location?company_id=${id}`)
              .then(response=>{
                  this.locations = response.data
              })
              .catch(err =>{
                  return err
              })
          
          this.createCheckLocationInitial()
          await axios
              .get(`/jobs/company/get_skills?company_id=${id}`)
              .then(response=>{
                  this.skills = response.data
              })
              .catch(err =>{
                  return err
              })
          
          this.createCheckSkillInitial()
      },
      methods:{
          addNewJob(){
              this.dialogVisible = true;
          },
          CreateJob(){
              this.dialogVisible = false;
              if (this.radio1=='1'){
                  this.dialogVisible1 = true;
              }
              else{
                  this.dialogVisible2 = true;
              }
          },
          async createCategory(){
              const data = {
                  company : this.$store.state.company.id,
                  name : this.category_name
              }
              await axios
              .post("/jobs/categories",data)
              .then(response =>{
                  console.log(response),
                  toast({
                      message : 'Create Category successful',
                      type :'is-success',
                      dismissible : true,
                      pauseOnHover :true,
                      duration :2000,
                      position :'bottom-right'
                  })
              })
              .catch(err=>{
                  console.log(err)
              })
              this.dialogVisible1 = false
              this.category_name = ''
              const id = this.$store.state.company.id
              
              await axios
              .get(`/jobs/company/get_category_and_job?company_id=${id}`)
              .then(response =>{
                  this.list_category = response.data
              })
              .catch(err=>{
                  console.log(err)
              })
          },
          toggleConfirmDelete(category_job){
              this.dialogDelete = true
              this.category_delete = category_job        
          },
          async deleteCategory(){
              if (this.category_delete.jobs.length>0){
                  console.log("Khum xoa dc")
              } else{
                  await axios
                  .delete(`/jobs/categories/${this.category_delete.category.id}`)
                  .then(response=>{                  
                  })
                  .catch(err=>{
                      console.log("error")
                  })
                 
                  this.dialogDelete = false
                  this.category_delete={}
                  toast({
                      message : 'Delete Category successful',
                      type :'is-success',
                      dismissible : true,
                      pauseOnHover :true,
                      duration :2000,
                      position :'bottom-right'
                  })
              }
          },
          createCheckLocationInitial(){
              for (let i of this.locations){
                  const data = {
                      id : i.id,
                      value : false
                  }
                  this.check_location[i.id]=data
              }
          },
          choiceLocations(id){
              if (this.check_location[id].value==true){
                  const data = this.locations.filter(item => item.id===id)[0]
                  this.choice_locations.push(data)
                  this.ids_locations.push(data.id)
              } else{
                  const index = this.choice_locations.find(item => item.id===id)
                  this.choice_locations.splice(index,1)
                  const index1 = this.ids_locations.find(item => item===id)
                  this.ids_locations.splice(index1,1)
              }
          },
          createCheckSkillInitial(){
              for (let i of this.skills){
                  const data = {
                      id : i.id,
                      value : false
                  }
                  this.check_skill[i.id]=data
              }
          },
          choiceSkill(id){
              if (this.check_skill[id].value==true){
                  const data = this.skills.filter(item => item.id===id)[0]
                  this.choice_skills.push(data)
                  this.ids_skill.push(data.id)
              } else{
                  const index = this.choice_skills.findIndex(item => item.id===id)
                  this.choice_skills.splice(index,1)
                  const index1 = this.ids_skill.find(item => item===id)
                  this.ids_skill.splice(index1,1)
              }
          },
          DeleteLocation(id){
              const index = this.choice_locations.findIndex(item => item.id===id)
              this.choice_locations.splice(index,1)
              this.check_location[id].value = false
              const index1 = this.ids_locations.findIndex(item => item===id)
              this.ids_locations.splice(index1,1)
              console.log(this.ids_locations)
          },
          DeleteSkill(id){
              const index = this.choice_skills.findIndex(item => item.id===id)
              this.choice_skills.splice(index,1)
              this.check_skill[id].value = false
              const index1 = this.ids_skill.findIndex(item => item===id)
              this.ids_skill.splice(index1,1)
              console.log(this.job.skills)
          },
          async CreatePostJob(){
              const data ={
                  name : this.job.name,
                  description : this.job.description,
                  salary : this.job.salary,
                  category : this.job.category,
                  company : this.$store.state.company.id,
                  is_company_hidden_name : this.job.is_company_hidden_name,
                  expected_result_test : this.job.expected_result_test,
                  limited_day_confirm_schedule : this.job.limited_day_confirm_schedule,
                  limited_day_do_test : this.job.limited_day_do_test,
                  locations : this.ids_locations,
                  skills : this.ids_skill
              }
              await axios
                  .post("/jobs/jobs",data)
                  .then(response=>{
                      console.log(response)                   
                  })
                  .catch(err=>{
                      console.log(err)
                  })
                  const id = this.$store.state.company.id
                  await axios
                      .get(`/jobs/company/get_category_and_job?company_id=${id}`)
                      .then(response =>{
                          this.list_category = response.data
                          toast({
                              message : 'Delete Category successful',
                              type :'is-success',
                              dismissible : true,
                              pauseOnHover :true,
                              duration :2000,
                              position :'bottom-right'
          
                          })
                          this.dialogVisible2 = false
                      })
                      .catch(err=>{
                          console.log(err)
                      })
          },
          async PublishJob(id,status){
              const data={
                  is_active : status
              }
              var mes = "Publish job success"
              if (!status){
                  mes = "Unpublish job success"
              }
              axios
              .patch(`/jobs/jobs/${id}`,data)
              .then(response =>{
                  toast({
                      message : mes,
                      type :'is-success',
                      dismissible : true,
                      pauseOnHover :true,
                      duration :2000,
                      position :'bottom-right'
                  })
              })
          },
          OpenDialogEditNameCategory(category)
          {
              this.edit_category.id = category.id
              this.edit_category.name = category.name
              this.dialogVisibleEditCategory=true
          },
          async editCategory(category){
              const data = {
                  name : this.edit_category.name
              }
              await axios
              .patch(`/jobs/categories/${category.id}`,data)
              .then(response =>{
                  toast({
                      message : "Update category name successfully",
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
              this.dialogVisibleEditCategory=false
              const id = this.$store.state.company.id
              axios
                  .get(`/jobs/company/get_category_and_job?company_id=${id}`)
                  .then(response =>{
                      this.categories = response.data
                  })
                  .catch(err=>{
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