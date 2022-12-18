<template>
  <div class="empty-applied-job">
    <img src="../assets/cart_empty_icon.png" alt="" />
    <div class="empty-applied__text">Empty</div>
    <!-- <div class="empty-applied_description">
      <p>You have not applied for any jobs yet!</p>
    </div>
    <div class="empty-applied__button">
      <a-button class="btnLogin">Applied Now</a-button>
    </div> -->
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EmptyApplied",
});
</script>
<style scoped>
.empty-applied-job {
  margin-top: 4rem !important;
}
.empty-applied-job img {
  height: 250px;
  margin-bottom: 2rem;
}
.empty-applied__text {
  font-size: 25px;
  font-family: Roboto, sans-serif;
  font-weight: 550;
  color: #034650;
  margin: 10px;
}
.empty-applied__button {
  margin: 2rem;
  font-size: 20px;
}
.empty-applied__button .ant-btn,
.empty-applied__button .ant-btn:active,
.empty-applied__button .ant-btn:focus {
  font-size: 20px;
  font-weight: 550;
  color: white;
  line-height: 30px;
}
.empty-applied__button button.ant-btn.btnLogin {
  height: 45px !important;
  width: 200px !important;
}
</style>
