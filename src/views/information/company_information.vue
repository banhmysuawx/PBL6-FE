<template>
    <div>
      <el-container class="layout-container-demo">
        <SideBar />
        <el-container>
          <el-header style="height: 50px"><HeaderCompanyView /></el-header>
          <el-container style="display: flex; flex-direction: row">
            <el-main>
                <el-card style="margin:100px 200px 0px 200px">
                    <el-row>
                        <el-col :span="10">
                            <el-image
                                :src="company.image"
                                :zoom-rate="1.2"
                                :preview-src-list="srcList"
                                :initial-index="4"
                                fit="cover"
                                />
                        </el-col>
                        <el-col :span="14">
                            <el-row style="font-size:25px">
                                <el-col :span="5"></el-col>
                                <el-col :span="14">{{ company.company_name }}</el-col>
                                <el-col :span="5"></el-col>
                            </el-row>
                            <el-row style="font-size:20px">
                                <el-col :span="2"></el-col>
                                <el-col :span="20"><el-icon color="red"><location /></el-icon> {{ company.company_location }}</el-col>
                                <el-col :span="2"></el-col>
                            </el-row>
                            <el-row>---------------------------------------------------------------------------------------------------</el-row>
                            <el-row style="font-size:20px">
                                <el-col :span="2"></el-col>
                                <el-col :span="20">{{ company.profile_description }}</el-col>
                                <el-col :span="2"></el-col>
                            </el-row>
                        </el-col>
                    </el-row>

                </el-card>
             
            </el-main>
          </el-container>
        </el-container>
      </el-container>
    </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import HeaderCompanyView from "@/components/HeaderCompany.vue";
import axios from "axios";

export default {
    name : "InformationCompany",
    data(){
      return{
        company:{},
      }
    },
    components: {
    SideBar,
    HeaderCompanyView,
    },
    created(){
      console.log("ahiii")
      console.log(this.$store.state.company.id)
      axios
      .get(`/companies/companies/${this.$store.state.company.id}`)
      .then(res=>{
        this.company = res.data
      })
      .catch(err=>{
        console.log(err)
      })
    }
}
</script>

<style lang="scss">

</style>