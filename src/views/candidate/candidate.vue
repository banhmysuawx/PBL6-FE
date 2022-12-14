<template>
    <div>
    <el-container class="layout-container-demo" >
      <SideBar/>
      <el-container>
          <el-header style="height:50px"><HeaderCompanyView/></el-header>
          <el-container style="display:flex; flex-direction: row;">
            <el-main>
            <el-row></el-row>
            <el-row :gutter="20">
                <el-col :span="1"></el-col>
                <el-col :span="8">
                    <el-input
                        v-model="input3"
                        placeholder="Please input"
                        class="input-with-select"
                        >
                        <template #prepend>
                            Filter By Name
                        </template>
                        </el-input>
                    </el-col>
                    <el-col :span="8">
                    <el-input
                        v-model="input3"
                        placeholder="Please input"
                        class="input-with-select"
                        >
                        <template #prepend>
                            Filter By Email
                        </template>
                        </el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-date-picker
                            v-model="value1"
                            type="date"
                            placeholder="Pick a day"
                            :size="size"
                        />
                    </el-col>

                  
            </el-row>
            <el-row>
                <el-col :span="2" style="padding-top: 10px;"><div>Show to</div></el-col> 
                <el-col :span="4">
                    <el-select v-model="value">
                        <el-option label="50" value="50" />
                        <el-option label="100" value="100" />
                        <el-option label="500" value="500" />
                      </el-select>
                </el-col> 
                <el-col :span="2" style="padding-top: 10px;">candidates</el-col> 

            </el-row>
            <el-row></el-row>
            <el-row style="margin-left:2px">
              
            <el-table
            :data="tableData"
            style="width: 100%"
        >
            <el-table-column type="selection" width="55" />
            <el-table-column property="fullname" label="Fullname" width="170"></el-table-column> 
            <el-table-column property="gender" label="Gender" width="80"></el-table-column> 
            <el-table-column property="email" label="Email" width="250"></el-table-column> 
            <el-table-column label="Information Detail" width="300">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="Skill(scope.row.seeker_id)"
                    >Skill</el-button>
                    <el-button
                    size="small"
                    @click="Education(scope.row.seeker_id)" > Education </el-button>
                    <el-button
                    size="small"
                    type="primary"
                    @click="Experience(scope.row.seeker_id)" > Expirence </el-button>
                </template>
            </el-table-column> 
            <el-table-column property="create_on" label="Create on" width="120" ></el-table-column> 
            <el-table-column label="Status" width="120">
                <template #default="scope">
                    <el-button type="primary" v-if="scope.row.is_active==true">Active</el-button>
                    <el-button type="danger" v-else>Inactive</el-button>

                </template>
            </el-table-column> 
            <el-table-column label="Action" show-overflow-tooltip   >
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
                    circle><el-icon><Edit /></el-icon></el-button
                    >
                    <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)" circle
                    ><el-icon><Delete /></el-icon></el-button
                    >
                </template>
            </el-table-column> 
            </el-table>
            

          </el-row>
          </el-main>
          </el-container>    
      
     </el-container>
    </el-container>

    <!--Drawer Skill-->
    <el-drawer v-model="drawerSkill" title="Skill Detail" :with-header="false">
        <span>Skill Detail</span>
        <el-timeline style="padding-top: 50px;">
            <el-timeline-item placement="top" type="primary" v-for="item in list_skill" :key="item">
            <el-card>
                <h4>{{item.skill_name}}</h4>
                <p>Level: {{item.skill_level}}</p>
               
            </el-card>
            </el-timeline-item>
        </el-timeline>
    </el-drawer>
      <!--Drawer Skill-->
    <el-drawer v-model="drawerEducation" title="Education Detail" :with-header="false">
        <span>Education Detail</span>
        <el-timeline style="padding-top: 50px;">
            <el-timeline-item :timestamp="item.completion_date" placement="top" type="primary" v-for="item in list_education" :key="item">
            <el-card>
                <h4>{{item.certificate_degree_name}}</h4>
                <p>Major: {{item.major}}</p>
                <p>University: {{item.university_name}}</p>
                <p>GPA: {{item.gpa}}</p>
            </el-card>
            </el-timeline-item>
        </el-timeline>
    </el-drawer>
      <!--Drawer Skill-->
    <el-drawer v-model="drawerExperience" title="Experience Detail" :with-header="false">
        <span>Experience Detail</span>
        <el-timeline style="padding-top: 50px;">
            <el-timeline-item :timestamp="item.end_date" placement="top" type="primary"  v-for="item in list_experience" :key="item">
            <el-card>
                <h4>{{item.job_title}}</h4>
                <p>Company: {{item.company_name}}</p>
                <p>Location:{{item.job_location}}</p>
            </el-card>
            </el-timeline-item>
        </el-timeline>
    </el-drawer>
 
  </div>

  </template>
  
  <script>

  import SideBar from "@/components/SideBar.vue"
  import HeaderCompanyView from "@/components/HeaderCompany.vue"
  import axios from 'axios'

  export default {
      name : "Candidate",
      data(){
        return{
            drawerSkill : false,
            drawerExperience :false,
            drawerEducation:false,
            list_education : [],
            list_experience : [],
            list_skill : [],
            tableData: [
            {
                avatar : "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                fullname : "Hoang Dung",
                gender : "Female",
                email : "dung@gmail.com",
                address : "Quang Nam",
                create_on : "20-11-2022",
                status : true

            },
            {
                avatar : "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                fullname : "Quang Duy",
                gender : "Male",
                email : "dung@gmail.com",
                address : "Quang Nam",
                create_on : "20-11-2022",
                status : false

            }
    ]}
        
      },
      mounted(){
        axios
        .get("/applicants/company/get_all_candidate?company_id=3")
        .then(response =>{
            this.tableData = response.data
            console.log(this.tableData)
        })
        .catch(err =>{
            console.log(err)
        })

      },

      components:{
        SideBar,
        HeaderCompanyView
      },
      methods: {
        async Education(seeker_id){
            this.drawerEducation = true
            await axios
            .get(`/seekers/profile-education?seeker_id=${seeker_id}`)
              .then(response =>{
                this.list_education = response.data
                console.log(this.list_education)
              })
              .catch(err=>{
                console.log(err)
              })
        },
        async Experience(seeker_id){
            this.drawerExperience = true
            await axios
              .get(`/seekers/profile-expirence?seeker_id=${seeker_id}`)
              .then(response =>{
                this.list_experience = response.data
              })
              .catch(err=>{
                console.log(err)
              })
        },

        async Skill(seeker_id){
            this.drawerSkill = true
            await axios
              .get(`/seekers/profile-skill?seeker_id=${seeker_id}`)
              .then(response =>{
                this.list_skill = response.data
              })
              .catch(err=>{
                console.log(err)
              })
        }
      }
     
  }
  </script>
  
  <style lang="scss">
  @import  "../../assets/css/index.css";
  @import "./index.scss"

  </style>