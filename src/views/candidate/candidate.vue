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
                            Filter By Address
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
            <el-row>
            <el-table
            :data="tableData"
            style="width: 100%"
        >
            <el-table-column type="selection" width="55" />
            <el-table-column  label="Avatar" width="70">
                <template #default="scope">
                    <el-avatar :size="30" :src="scope.row.avatar" />
                </template>
            </el-table-column> 
            <el-table-column property="fullname" label="Fullname" width="120"></el-table-column> 
            <el-table-column property="gender" label="Gender" width="80"></el-table-column> 
            <el-table-column property="email" label="Email" width="150"></el-table-column> 
            <el-table-column property="address" label="Address" width="110" ></el-table-column> 
            <el-table-column label="Information Detail" width="300">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="handleDelete(scope.$index, scope.row)"
                    >Skill</el-button>
                    <el-button
                    size="small"
                    @click="drawerEducation=true" > Education </el-button>
                    <el-button
                    size="small"
                    type="primary"
                    @click="drawerExperience=true" > Expirence </el-button>
                </template>
            </el-table-column> 
            <el-table-column property="create_on" label="Create on" width="120" ></el-table-column> 
            <el-table-column label="Status" width="100">
                <template #default="scope">
                    <el-button type="primary" v-if="scope.row.status==true">Active</el-button>
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
        <span>Hi there!</span>
    </el-drawer>
      <!--Drawer Skill-->
    <el-drawer v-model="drawerEducation" title="Education Detail" :with-header="false">
        <span>Education Detail</span>
        <el-timeline style="padding-top: 50px;">
            <el-timeline-item timestamp="2018/4/12" placement="top" type="primary">
            <el-card>
                <h4>Information Technology Engineer</h4>
                <p>Major: Information technology</p>
                <p>University: Da Nang University Technology</p>
                <p>GPA: 3.7</p>
            </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/3" placement="top" type="primary">
            <el-card>
                <h4>Information Technology Engineer</h4>
                <p>Major: Information technology</p>
                <p>University: Da Nang University Technology</p>
                <p>GPA: 3.7</p>
            </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/2" placement="top" type="primary">
            <el-card>
                <h4>Information Technology Engineer</h4>
                <p>Major: Information technology</p>
                <p>University: Da Nang University Technology</p>
                <p>GPA: 3.7</p>
            </el-card>
            </el-timeline-item>
        </el-timeline>
    </el-drawer>
      <!--Drawer Skill-->
    <el-drawer v-model="drawerExperience" title="Experience Detail" :with-header="false">
        <span>Experience Detail</span>
        <el-timeline style="padding-top: 50px;">
            <el-timeline-item timestamp="2018/4/12" placement="top" type="primary">
            <el-card>
                <h4>Development Software Intern</h4>
                <p>Company: Paradox VN</p>
                <p>Location: Nguyen Huu Tho - Da Nang</p>
            </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/3" placement="top" type="primary">
            <el-card>
                <h4>Automation Freelancer</h4>
                <p>Company: Paradox VN</p>
                <p>Location: Nguyen Huu Tho - Da Nang</p>
            </el-card>
            </el-timeline-item>
        </el-timeline>
    </el-drawer>
 
  </div>

  </template>
  
  <script>

  import SideBar from "@/components/SideBar.vue"
  import HeaderCompanyView from "@/components/HeaderCompany.vue"
  
  export default {
      name : "Candidate",
      data(){
        return{
            drawerSkill : false,
            drawerExperience :false,
            drawerEducation:false,
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
      components:{
        SideBar,
        HeaderCompanyView
      },
     
  }
  </script>
  
  <style lang="scss">
  @import  "../../assets/css/index.css";
  @import "./index.scss"

  </style>