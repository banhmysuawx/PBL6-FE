<template>
  <div class="job-name">
    {{ jobDetail.id }} IT Project (Sharepoint Project And Helpdesk Project) -
    Fulltime Remote
    <div class="company">KMS</div>
    <div class="apply-btn">
      <a-button>Apply Now</a-button>
    </div>
  </div>
  <div class="job-detail-box__description">
    <div class="tag">
      <p>.NET</p>
      <p>Java</p>
    </div>
    <div class="salary">
      <DollarOutlined />
      <p>You will love it</p>
    </div>
    <div class="info">
      <WifiOutlined />
      <p>Hoa Chau, Hoa Vang, Da Nang</p>
    </div>
    <div class="info">
      <PhoneOutlined />
      <p>0935125585</p>
    </div>
    <div class="info">
      <ContactsOutlined />
      <p>1d</p>
    </div>
    <div class="divider"></div>
    <div class="job-description">
      <h2>Job Description</h2>
      <ul>
        <li>We build blockchain games and publishing platform.</li>
        <li>We believe the blockchain should be invisible in our games.</li>
        <li>
          We use simple game mechanics that all players can enjoy, whether or
          not they consider themselves to be blockchain pros.
        </li>
      </ul>
    </div>
    <div class="skill-and-experience">
      <h2>Your Skills and experience</h2>
      <ul>
        <li>
          At least 2 years of experience in game implementation using Blockchain
          Development technology;
        </li>
        <li>
          Experience on Unity Editor platform is preferred; 1 - 3 years of
          experience in Ethereum, EOS, Solidity…
        </li>
        <li>Understanding contract schedules such as ERC20, ERC721, ERC1155</li>
      </ul>
    </div>
    <div class="benefit">
      <h2>Your Benefits</h2>
      <ul>
        <li>Salary up to $2100</li>
        <li>Monthly payroll fulfillment on the 30th;</li>
        <li>40 flexible working hours per week from Monday to Friday</li>
        <li>
          Annual raise: 10% or dependent on annual performance evaluation (APE);
        </li>
        <li>
          Incentives: Parking, lunch, token, monthly networking dinner' &
          annually company's retreats;
        </li>
        <li>Chance to gain blockchain game art design experience;</li>
        <li>Lunch allowance</li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
  DollarOutlined,
  WifiOutlined,
  PhoneOutlined,
  ContactsOutlined,
} from "@ant-design/icons-vue";
import axios from "axios";
import { Job } from "../../utils";
export default defineComponent({
  name: "JobDetail",
  components: {
    DollarOutlined,
    WifiOutlined,
    PhoneOutlined,
    ContactsOutlined,
  },
  data() {
    return {
      jobDetail: {},
      name: Number,
    };
  },
  props: {
    id: Number,
  },
  mounted() {
    this.getJobDetail();
  },
  methods: {
    async getJobDetail() {
      console.log(this.id);
      await axios
        .get("https://api.quangdinh.me/jobs/jobs/" + this.id)
        .then((response) => {
          this.jobDetail = response.data;
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    },
  },
  watch: {
    id() {
      this.$emit("change", this.id);
    },
  },
});
</script>
<style scoped>
@import "./index.css";
</style>
