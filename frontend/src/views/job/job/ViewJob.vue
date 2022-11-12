<template>
<div>
 <el-container class="layout-container-demo" >
    <SideBar/>
    <el-container>
            <el-header style="height:50px;"><HeaderView/></el-header>
             <div style="height:30px; text-align:left; transform: translateY(30%);">
                 <span style="margin-left:20px; "><b>Home - Job</b></span>
            </div>
       
        <el-container>
                 <el-main style="display: flex;flex-direction: column;">
                  <el-row>
                    <el-col :span="22">
                    <div class="button-add-job">
                        <el-button type="primary" @click="dialogVisible = true">Add New Job</el-button>
                    </div>
                    </el-col>
                  </el-row>

                    <div class="main-container" style="display:flex;flex-direction:column">
                        <el-row>
                            <el-col :span="2"></el-col>
                            <el-col :span="20">
                                <div class="job-category">
                                    <el-card class="box-card">
                                    <template #header>
                                    
                                    </template>
                                    <el-collapse v-model="activeNames" @change="handleChange">
                                        <el-collapse-item name="1" style="box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);">
                                            <template #title>
                                                <div class="title" ><b>DEV </b></div>
                                            </template>
                                       
                                            <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
                                                <li v-for="i in count" :key="i" class="infinite-list-item" >
                                                    <div class="job-item" >
                                                        <el-row style="margin-top:10px;margin-bottom: 7px;">
                                                            <el-col :span="4" style="cursor:pointer">Software Enginer</el-col>
                                                            <el-col :span="20" style="text-align:right" >  <el-switch size="small" v-model="value2" class="ml-2" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"/></el-col>
                                                        </el-row>
                                                        <el-row>
                                                            <el-col :span="8"><el-icon color="red"><location /></el-icon> Ho Chi Minh city</el-col>
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
                        <el-row>
                            <el-col :span="2"></el-col>
                            <el-col :span="20">
                                <div class="job-category">
                                    <el-card class="box-card">
                                    <template #header>
                                    
                                    </template>
                                    <el-collapse v-model="activeNames" @change="handleChange">
                                        <el-collapse-item name="1" style="box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);">
                                            <template #title>
                                                <div class="title" ><b>Manager </b></div>
                                            </template>
                                       
                                            <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
                                                <li v-for="i in count" :key="i" class="infinite-list-item" >
                                                    <div class="job-item" >
                                                        <el-row style="margin-top:10px;margin-bottom: 7px;">
                                                            <el-col :span="4" style="cursor:pointer">Software Enginer</el-col>
                                                            <el-col :span="20" style="text-align:right" >  <el-switch size="small" v-model="value2" class="ml-2" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"/></el-col>
                                                        </el-row>
                                                        <el-row>
                                                            <el-col :span="8"><el-icon color="red"><location /></el-icon> Ho Chi Minh city</el-col>
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

                        <el-row>
                            <el-col :span="2"></el-col>
                            <el-col :span="20">
                                <div class="job-category">
                                    <el-card class="box-card">
                                    <template #header>
                                    
                                    </template>
                                    <el-collapse v-model="activeNames" @change="handleChange">
                                        <el-collapse-item name="1" style="box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);">
                                            <template #title>
                                                <div class="title" ><b>HR </b></div>
                                            </template>
                                       
                                            <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
                                                <li v-for="i in count" :key="i" class="infinite-list-item" style="height:70px;background-color: #f0f2f5;">
                                                    <div class="job-item" style="display : flex; flex-direction:column; width: 100%;">
                                                        <el-row style="margin-top:10px;margin-bottom: 7px;">
                                                            <el-col :span="4" style="cursor:pointer">Software Enginer</el-col>
                                                            <el-col :span="20" style="text-align:right" >  <el-switch size="small" v-model="value2" class="ml-2" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"/></el-col>
                                                        </el-row>
                                                        <el-row>
                                                            <el-col :span="8"><el-icon color="red"><location /></el-icon> Ho Chi Minh city</el-col>
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

                        <el-row>
                            <el-col :span="2"></el-col>
                            <el-col :span="20">
                                <div class="job-category">
                                    <el-card class="box-card">
                                    <template #header>
                                    
                                    </template>
                                    <el-collapse v-model="activeNames" @change="handleChange">
                                        <el-collapse-item name="1" style="box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);">
                                            <template #title>
                                                <div class="title" ><b>QA </b></div>
                                            </template>
                                       
                                            <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
                                                <li v-for="i in count" :key="i" class="infinite-list-item" >
                                                    <div class="job-item">
                                                        <el-row style="margin-top:10px;margin-bottom: 7px;">
                                                            <el-col :span="4" style="cursor:pointer">Software Enginer</el-col>
                                                            <el-col :span="20" style="text-align:right" >  <el-switch size="small" v-model="value2" class="ml-2" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"/></el-col>
                                                        </el-row>
                                                        <el-row>
                                                            <el-col :span="8"><el-icon color="red"><location /></el-icon> Ho Chi Minh city</el-col>
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

        </el-container>     
   </el-container>
   </el-container>

   <el-dialog
    v-model="dialogVisible"
    width="30%"
    :before-close="handleClose"
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
    :before-close="handleClose"
  >
  <el-form>
    <el-form-item>
        <el-col :span="2">
            <label>Name</label>
        </el-col>
        <el-col :span="8">
            <el-input placeholder="Please enter category name " ></el-input>
        </el-col>
    </el-form-item>


  </el-form>

    <template #footer>
      <span class="dialog-footer" style="text-align: left;">
        <el-button @click="dialogVisible1 = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible1 = false">
          Save
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog
    v-model="dialogVisible2"
    width="60%"
    :before-close="handleClose"
  >
  <el-form>
    <el-form-item>
        <el-col :span="8">
            <label>Job Name</label>
        </el-col>
        <el-col :span="16">
            <el-input placeholder="Please enter job name " ></el-input>
        </el-col>
    </el-form-item>
        
    <el-form-item>
        <el-col :span="8">
            <label>Job Category</label>
        </el-col>
        <el-col :span="6">
            <el-select v-model="value" placeholder="----Select Country----">
                <el-option label="item1" value="item1" key="item1"/>
                <el-option label="item2" value="item2"/>  
            </el-select>
        </el-col>
    </el-form-item>

    <el-form-item>
        <el-col :span="8">
            <label>Description</label>
        </el-col>
        <el-col :span="16">
            <el-input type="textarea" placeholder="Please input description"></el-input>
        </el-col>
    </el-form-item>

    <el-form-item>
        <el-col :span="8"><label>Location</label></el-col>
        <el-col :span="16">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <div style="display: inline-block; margin-left: 20px">
                    <el-select
                        v-model="value_location"
                        multiple
                        filterable
                        remote
                        reserve-keyword
                        placeholder="Please enter a keyword"
                        remote-show-suffix
                        :remote-method="remoteMethod"
                        :loading="loading"
                    >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                    </div>
                </div>
            </template>
        <div class="location-item">
            <el-icon color="red"><location /></el-icon>
            <span>  Ho Chi Minh city</span>
            <el-button link @click="outerVisible = true"><Delete style="width: 1em; height: 1em; margin-left : 5px" /></el-button> 
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
                        v-model="value_skill"
                        multiple
                        filterable
                        remote
                        reserve-keyword
                        placeholder="Please enter a keyword"
                        remote-show-suffix
                        :remote-method="remoteMethodSkill"
                        :loading="loading"
                    >
                        <el-option
                            v-for="item in optionsSkill"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                    </div>
                </div>
            </template>
        <div class="location-item">
            <el-icon color="blue"><User /></el-icon>
            <span>Intern</span>
            <el-button link @click="outerVisible = true"><Delete style="width: 1em; height: 1em; margin-left : 5px" /></el-button> 
        </div>
        </el-card>
        </el-col>
    </el-form-item>

    <el-form-item>
        <el-col :span="21">
            <el-checkbox v-model="checked1" label="Company Name Hide" size="large" />
        </el-col>
        
    </el-form-item>


  </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible2 = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible2 = false">
          Save
        </el-button>
        <el-button type="primary" @click="dialogVisible2 = false">
          Publish
        </el-button>
      </span>
    </template>
  </el-dialog>

  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue"
import HeaderView from "@/components/Header.vue"

export default {
    name : "ViewJob",
    data(){
        return{
            dialogVisible : false,
            dialogVisible1: false,
            dialogVisible2: false,
            radio1 : '1',
            states : [
                'Alabama',
                'Alaska',
                'Arizona',
                'Arkansas',
                'California',
                'Colorado',],
            options:[],
            list:[],
            value_location : '',
            skills : [
                'Intern',
                'Fresher',
                'Middle',
                'Junior',
                'Senior',
                'Manager'
            ],
            optionsSkill:[],
            list_skills : [],
            value_skill :'',
            count :10,
            value2 : true
        }
    },
    components:{
        SideBar,
        HeaderView
    },
   
    mounted() {
        this.list = this.states.map((item) => {
        return { value: `${item}`, label: `${item}`}})
        this.list_skills = this.skills.map((item) => {
        return { value: `${item}`, label: `${item}`}
    })
    },

    methods:{
        CreateJob(){
            this.dialogVisible = false;
            if (this.radio1=='1'){
                this.dialogVisible1 = true;
            }
            else{
                this.dialogVisible2 = true;
            }
        },

        remoteMethod(st){
            if (st){
                this.loading = true
                setTimeout(() => {
                this.loading = false
                this.options = this.list.filter((item) => {
                    return item.label.toLowerCase().includes(st.toLowerCase())
                })
                }, 200)
            } else 
            {
                this.options = []
            }
            
        },

        remoteMethodSkill(st){
            if (st){
                this.loading = true
                setTimeout(() => {
                this.loading = false
                this.optionsSkill = this.list_skills.filter((item) => {
                    return item.label.toLowerCase().includes(st.toLowerCase())
                })
                }, 200)
            } else 
            {
                this.options = []
            }
            
        },
    }
}
</script>

<style lang="scss">
@import  "../../../assets/css/index.css";
@import "./index.scss"
</style>