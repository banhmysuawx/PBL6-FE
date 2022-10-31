<template>
<div>
 <el-container class="layout-container-demo" >
    <SideBar/>
    <el-container>
        <el-header style="height:50px"><HeaderView/></el-header>
        <el-container>
                 <el-main>
                    <div class="button-add-job">
                        <el-button type="primary" @click="dialogVisible = true">Add New Job</el-button>
                    </div>
                    <div class="main-container">
                        <div class="job-category">
                            <el-collapse v-model="activeNames" @change="handleChange">
                                <el-collapse-item name="1" >
                                    <template #title>
                                        <div class="title"><b>DEV</b></div>
                                    </template>
                                    <div class="job-item">
                                        <el-row>
                                            <el-col :span="8">Doctor</el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="8"><el-icon color="red"><location /></el-icon> Ho Chi Minh city</el-col>
                                            <el-col :span="8">10 candidates apply</el-col>
                                            <el-col :span="8">
                                                <el-button link><Edit style="width: 1em; height: 1em; margin-left: 10px" color="blue" /></el-button>
                                                <el-button link @click="outerVisible = true"><Delete style="width: 1em; height: 1em; margin-left : 5px" color="black" /></el-button>
                                            </el-col>
                                        </el-row>
                                       
                                    </div>
                                    <div class="job-item">
                                        <el-row>
                                            <el-col :span="8">Doctor</el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="8"><el-icon color="red"><location /></el-icon> Ho Chi Minh city</el-col>
                                            <el-col :span="8">10 candidates apply</el-col>
                                            <el-col :span="8">
                                                <el-button link><Edit style="width: 1em; height: 1em; margin-left: 10px" color="blue" /></el-button>
                                                <el-button link @click="outerVisible = true"><Delete style="width: 1em; height: 1em; margin-left : 5px" color="black" /></el-button>
                                            </el-col>
                                        </el-row>
                                    </div>
                                    <div class="job-item">
                                        <el-row>
                                            <el-col :span="8">Doctor</el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="8"><el-icon color="red"><location /></el-icon> Da Nang city</el-col>
                                            <el-col :span="8">10 candidates apply</el-col>
                                            <el-col :span="8">
                                                <el-button link><Edit style="width: 1em; height: 1em; margin-left: 10px" color="blue" /></el-button>
                                                <el-button link @click="outerVisible = true"><Delete style="width: 1em; height: 1em; margin-left : 5px" color="black" /></el-button>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </el-collapse-item>
                                <el-collapse-item name="2">
                                    <template #title>
                                        <div class="title"><b>Manager</b></div>
                                    </template>
                                    <div class="job-item">
                                        <el-row>
                                            <el-col :span="8">Doctor</el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="8"><el-icon color="red"><location /></el-icon> Ho Chi Minh city</el-col>
                                            <el-col :span="8">10 candidates apply</el-col>
                                            <el-col :span="8">
                                                <el-button link><Edit style="width: 1em; height: 1em; margin-left: 10px" color="blue" /></el-button>
                                                <el-button link @click="outerVisible = true"><Delete style="width: 1em; height: 1em; margin-left : 5px" color="black" /></el-button>
                                            </el-col>
                                        </el-row>
                                       
                                    </div>
                                    <div class="job-item">
                                        <el-row>
                                            <el-col :span="8">Doctor</el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="8"><el-icon color="red"><location /></el-icon> Ho Chi Minh city</el-col>
                                            <el-col :span="8">10 candidates apply</el-col>
                                            <el-col :span="8">
                                                <el-button link><Edit style="width: 1em; height: 1em; margin-left: 10px" color="blue" /></el-button>
                                                <el-button link @click="outerVisible = true"><Delete style="width: 1em; height: 1em; margin-left : 5px" color="black" /></el-button>
                                            </el-col>
                                        </el-row>
                                    </div>
                                    <div class="job-item">
                                        <el-row>
                                            <el-col :span="8">Doctor</el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="8"><el-icon color="red"><location /></el-icon> Da Nang city</el-col>
                                            <el-col :span="8">10 candidates apply</el-col>
                                            <el-col :span="8">
                                                <el-button link><Edit style="width: 1em; height: 1em; margin-left: 10px" color="blue" /></el-button>
                                                <el-button link @click="outerVisible = true"><Delete style="width: 1em; height: 1em; margin-left : 5px" color="black" /></el-button>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
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
        <el-button type="primary" @click="CreateJob()">
          Create
        </el-button>
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
      <span class="dialog-footer">
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
            value_skill :''
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
            
        }
    }
}
</script>

<style lang="scss">
@import  "../../../assets/css/index.css";

.main-container .el-card{
    width: 100%;
}

.title{
    font-size: 18px;
    margin-left: 20px;

}

.el-collapse-item{
    margin-bottom: 30px;
}

.job-item {
    margin-bottom: 10px;
    border-top: 0.5px solid rgb(95, 158, 160);
    height: 70px;
    text-align: left;
    font-size: 15px;

    .text-job-item{
        margin: 10px 20px;

    }
}

.el-row {
    margin-bottom: 20px;
}


.job-category{
    margin-left: 100px;
    width: 1000px;
}

.job-category .el-collapse .el-collapse-item {
    border: 0.5px solid rgb(135, 206, 250);
}

.button-add-job{
    text-align: right;
    margin-bottom: 20px;
    margin-top: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 530px;
}

.location-item{
    margin-left: 30px;
    text-align: left;
}
</style>