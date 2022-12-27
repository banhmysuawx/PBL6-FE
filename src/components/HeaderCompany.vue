<template>
  <div>
    <!-- <el-button type="primary">Log In</el-button>
      <el-button type="default">Sign Up</el-button> -->
    <router-link :to="{ name: 'home' }">
      <span style="font-size: 20px">{{this.$store.state.company.name}}</span>
      <!-- <router-link :to="{ name: 'JobBoard' }">
      <span style="font-size: 20px">Sign to Company</span> -->
    </router-link>
  </div>
</template>

<script>
export default {
  name: "HeaderCompanyView",
  components: {},
};
</script>
<style>
.flex-grow {
  flex-grow: 1;
}
</style>
