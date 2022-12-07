<template>
  <div class="footer-component">
    <a-layout-footer>
      <div class="row">
        <div class="support">
          <div class="about-us">About us</div>
          <p>Home</p>
          <p>Contact us</p>
          <p>About us</p>
          <p>All Jobs</p>
        </div>
        <div class="team">
          <div class="members">Team Members</div>
          <p>Truong Quang Dinh</p>
          <p>Nguyen Tri An</p>
          <p>Ngo Nguyen Hoang Dung</p>
          <p>Ngo Le Gia Hung</p>
          <p>Nguyen Thi Anh Tuyet</p>
        </div>
        <div class="contact">
          <div class="contact-us">Phone And Address</div>
          <p>Phone Number: 0935125585</p>
          <p>Address: Da Nang</p>
          <p>Email: 102190048@sv1.dut.udn.vn</p>
        </div>
        <div class="contact">
          <div class="contact-us">Phone And Address</div>
          <p>Phone Number: 0935125585</p>
          <p>Address: Da Nang</p>
          <p>Email: 102190048@sv1.dut.udn.vn</p>
        </div>
      </div>
    </a-layout-footer>
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer",
});
</script>
<style scoped>
.footer-component {
  background: #e9e9e9;
  margin: 3rem;
  margin-bottom: 0;
}
.footer-component .row {
  display: flex;
  flex-wrap: wrap;
  margin: 10px;
  text-align: left;
}
.support,
.team,
.contact {
  flex: 0 0 auto;
  width: 25%;
  font-size: 14px;
  line-height: 14px;
}
.about-us,
.members,
.contact-us {
  margin-bottom: 20px;
  font-weight: 550;
}
</style>
