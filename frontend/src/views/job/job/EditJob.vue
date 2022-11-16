<template>
    <div>
     <el-container class="layout-container-demo" >
        <SideBar/>
        <el-container>
            <el-header style="height:50px"><HeaderView/></el-header>
            <el-container>
                <el-main>
                    <div class="main-container">
                        <div class="job-category">
                            <el-card class="box-card" style="margin-top:20px">
                                <template #header>                             
                                </template>
                                <el-form>
                                    <el-form-item>
                                        <el-col :span="8">
                                            <label>Name</label>
                                        </el-col>
                                        <el-col :span="8">
                                            <el-input placeholder="Please enter category name " ></el-input>
                                        </el-col>
                                    </el-form-item>

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

                            <span class="dialog-footer">
                                <el-button type="danger" @click="dialogVisible1 = false">Cancel</el-button>
                                <el-button type="primary" @click="dialogVisible1 = false">Save Change</el-button>
                                <el-button type="primary" @click="dialogVisible1 = false">Publish</el-button>
                            </span>  
                     </el-form>
               </el-card>
            </div>
            </div>                        
        </el-main>  
        </el-container>     
       </el-container>
       </el-container>
    
      
    
      
      </div>
    </template>
    
<script>
    import SideBar from "@/components/SideBar.vue"
    import HeaderView from "@/components/Header.vue"
    
    export default {
        name : "EditJob",
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
    @import  "./index.scss";
</style>