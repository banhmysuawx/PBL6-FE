<template>
  <div class="home">
    <a-layout>
      <Header />
      <a-layout-content>
        <div class="user-show">
          <div class="container">
            <div class="my-profile">
              <div class="my-profile-wrapper">
                <div class="my-account-info-box">
                  <profile-component />
                </div>
                <div class="my-account-info-box">
                  <account-component />
                </div>
              </div>
            </div>
          </div>
        </div>
      </a-layout-content>
      <Footer />
    </a-layout>
  </div>
</template>

<script>
import EmptyProfile from "../../components/EmptyProfile.vue";
import AddProfile from "../../components/AddProfile.vue";
import AccountComponent from "../../components/AccountComponent.vue";
import Header from "../../layouts/header.vue";
import Footer from "../../layouts/footer.vue";
import ProfileComponent from "../../components/profile/ProfileComponent.vue";
export default {
  name: "ProfileView",
  components: {
    EmptyProfile,
    AddProfile,
    AccountComponent,
    Header,
    Footer,
    ProfileComponent,
  },
};
</script>
<style scoped>
.container {
  background-color: #f9f8f8;
  position: relative;
}
.my-profile {
  margin: 30px auto;
  max-width: 1350px;
  min-height: 700px;
  height: calc(100vh - 360px);
  background-color: transparent;
  border: none;
}

.my-profile .my-profile-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  background-color: #e9e9e9;
  height: 100%;
}
.my-profile .my-account-info-box {
  height: 100%;
  overflow: hidden;
  background-color: white;
  padding: 20px;
  overflow-y: scroll;
  height: 700px;
}
.home main.ant-layout-content {
  position: relative;
  top: 64px;
}
.my-account-info-box .ant-tabs-content {
  display: flex;
}
</style>
