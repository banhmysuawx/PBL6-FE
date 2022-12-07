<template>
<div>
  
</div>
<router-view/>
</template>

<script>
import SideBar from "@/components/SideBar.vue"
import HeaderCompanyView from "@/components/HeaderCompany.vue"

export default {
  data(){
    return{
      is_company : true
    }
  },
 
  components: {
    SideBar,
    HeaderCompanyView
  }
}
</script>

<style lang="scss">
@import "../node_modules/bulma";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>