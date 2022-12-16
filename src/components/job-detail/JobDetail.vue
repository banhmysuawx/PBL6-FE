<template>
  <div class="job-name">
    {{ jobDetail.name }}
    <div class="company">{{ jobDetail.company?.company_name }}</div>
    <div class="apply-btn">
      <a-button @click="showModal" :style="{ background: color }"
        >Apply Now</a-button
      >
      <a-modal v-model:visible="visible" title="Apply Form" @ok="submitApply">
        <a-form class="apply-form">
          <FormItem name="info">
            <Input placeholder="More Information" v-model:value="info"></Input>
          </FormItem>
          <FormItem name="password">
            <input type="file" @change="uploadFile($event)" />
          </FormItem>
        </a-form>
      </a-modal>
      <div class="favorite">
        <p @click="createFavorite" :style="{ color: isFavorite }">❤</p>
      </div>
    </div>
  </div>
  <div class="job-detail-box__description">
    <div class="tag">
      <p v-for="skill in jobDetail.skills">{{ skill.name }}</p>
    </div>
    <div class="salary">
      <DollarOutlined />
      <p>{{ jobDetail.salary }}</p>
    </div>
    <div class="info">
      <WifiOutlined />
      <p>
        {{ jobDetail.locations?.map((item) => item.location_name).join(", ") }}
      </p>
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
        <li>{{ jobDetail.description }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import { Input, InputPassword, FormItem } from "ant-design-vue";
import { defineComponent } from "vue";
import {
  DollarOutlined,
  WifiOutlined,
  PhoneOutlined,
  ContactsOutlined,
  UploadOutlined,
} from "@ant-design/icons-vue";
import axios from "axios";
export default defineComponent({
  name: "JobDetail",
  components: {
    DollarOutlined,
    WifiOutlined,
    PhoneOutlined,
    ContactsOutlined,
    UploadOutlined,
    InputPassword,
    Input,
    FormItem,
  },
  data() {
    const userId = localStorage.getItem("id");
    return {
      jobDetail: {},
      name: Number,
      visible: false,
      info: "",
      file: "",
      color: "#007082",
      isFavorite: "#d8d8d8",
      favoriteId: null,
      userId,
    };
  },

  props: {
    id: Number,
  },
  watch: {
    id() {
      this.getJobDetail();
    },
  },
  mounted() {
    this.getJobDetail();
  },
  methods: {
    showModal() {
      if (!localStorage.getItem("id")) this.$router.push({ name: "login" });
      this.visible = true;
    },
    uploadFile(event) {
      this.file = event.target.files[0];
      console.log(this.file);
    },
    async getJobDetail() {
      console.log(this.id);
      await axios
        .get("jobs/user/" + this.id + "/job")
        .then((response) => {
          this.jobDetail = response.data.job;
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    },
    async submitApply() {
      const form = {
        job: this.id,
        candidate: this.userId,
        cv: this.file,
        information_added: this.info,
      };
      await axios
        .post("applicants/applicant", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.visible = false;
          this.color = "#e9e9e9";
        })
        .catch((error) => console.log(error));
    },
    async createFavorite() {
      const input = {
        user: this.userId,
        job: this.id,
      };
      await axios
        .post("favorites/favorites/create", input)
        .then((response) => {
          this.isFavorite = "red";
        })
        .catch((error) => console.log(error));
    },
  },
});
</script>
<style scoped>
@import "./index.css";
.favorite p {
  color: #d8d8d8;
  padding: 0 10px;
  font-size: 40px;
}
.favorite p:hover {
  color: red;
}
.apply-btn {
  display: flex;
}
</style>
