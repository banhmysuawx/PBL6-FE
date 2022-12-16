<template>
  <div class="profile-component">
    <div class="profile-item">
      <div class="profile-item__title">
        <div class="profile-item__title__detail">
          Education
          <a><PlusCircleOutlined @click="showModal" /></a>
        </div>
      </div>
      <div class="profile-item__content">
        <div class="content-title">
          <div class="content-title-bar">
            Ce + major
            <div class="content-title-bar__icon">
              <a><EditOutlined @click="showModal" /></a>
              <a><DeleteOutlined /></a>
            </div>
          </div>
          <p>1/1/2020 - 1/7/2020</p>
          <p>DUT</p>
          <p>GPA</p>
        </div>
      </div>
      <a-modal
        v-model:visible="visible"
        title="Add Education"
        @ok="handleOk"
        style="width: fit-content !important"
      >
        <a-form class="profile-item__form">
          <FormItem name="major" label="Major">
            <Input id="major" placeholder="Your major name"></Input>
          </FormItem>
          <FormItem name="certificate" label="Certificate Degree Name">
            <Input
              id="certificate"
              placeholder="Certificate Degree Name"
            ></Input>
          </FormItem>
          <FormItem name="university" label="University Name">
            <Input id="university" placeholder="University Name"></Input>
          </FormItem>
          <FormItem name="start" label="Starting Date">
            <DatePicker
              style="width: 280px; height: 40px; border: 1px s"
              show-time
              type="date"
              placeholder="Starting Date"
            />
          </FormItem>
          <FormItem name="complete" label="Completion Date">
            <DatePicker
              style="width: 280px; height: 40px; border: 1px s"
              show-time
              type="date"
              placeholder="Completion Date"
            />
          </FormItem>
          <FormItem name="gpa" label="GPA">
            <Input id="gpa" placeholder="GPA"></Input>
          </FormItem>
        </a-form>
      </a-modal>
    </div>
    <div class="profile-item">
      <div class="profile-item__title">
        <div class="profile-item__title__detail">
          Experience
          <a><PlusCircleOutlined @click="showModal2" /></a>
        </div>
      </div>
      <div class="profile-item__content">
        <div class="content-title">
          <div class="content-title-bar">
            Ce + major
            <div class="content-title-bar__icon">
              <a><EditOutlined @click="showModal2" /></a>
              <a><DeleteOutlined /></a>
            </div>
          </div>
          <p>1/1/2020 - 1/7/2020</p>
          <p>DUT</p>
          <p>GPA</p>
        </div>
      </div>
      <a-modal
        v-model:visible="visible2"
        title="Add Experience"
        @ok="handleOk2"
        style="width: fit-content !important"
      >
        <a-form class="profile-item__form">
          <FormItem name="title" label="Job Name">
            <Input id="title" placeholder="Job Name"></Input>
          </FormItem>
          <FormItem name="company" label="Company Name">
            <Input id="company" placeholder="Company Name"></Input>
          </FormItem>
          <FormItem name="location" label="Job Location">
            <Input id="location" placeholder="Job Location"></Input>
          </FormItem>
          <FormItem name="description" label="Description">
            <Input id="description" placeholder="Description"></Input>
          </FormItem>
          <FormItem name="start" label="Starting Date">
            <DatePicker
              style="width: 280px; height: 40px; border: 1px s"
              show-time
              type="date"
              placeholder="Starting Date"
            />
          </FormItem>
          <FormItem name="complete" label="Completion Date">
            <DatePicker
              style="width: 280px; height: 40px; border: 1px s"
              show-time
              type="date"
              placeholder="Completion Date"
            />
          </FormItem>
        </a-form>
      </a-modal>
    </div>
    <div class="profile-item">
      <div class="profile-item__title">
        <div class="profile-item__title__detail">
          Skills
          <a><PlusCircleOutlined @click="showModal1" /></a>
        </div>
      </div>
      <div class="profile-item__content">
        <div class="content-title">
          <div class="content-title-bar">
            Skill
            <div class="content-title-bar__icon">
              <a><EditOutlined @click="showModal2" /></a>
              <a><DeleteOutlined /></a>
            </div>
          </div>
          <p>Level</p>
        </div>
      </div>
      <a-modal
        v-model:visible="visible1"
        title="Add Experience"
        @ok="handleOk1"
        style="width: fit-content !important"
      >
        <a-form class="profile-item__form">
          <FormItem name="skill-name" label="Skill Name">
            <Input id="skill-name" placeholder="Skill Name"></Input>
          </FormItem>
          <FormItem name="skill-level" label="Skill Level">
            <Input id="skill-level" placeholder="Skill Level"></Input>
          </FormItem>
        </a-form>
      </a-modal>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { FormItem, Input, DatePicker } from "ant-design-vue";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons-vue";
import { Education, Experience, Skill } from "../../utils";
import axios from "axios";
export default defineComponent({
  name: "ProfileComponent",
  components: {
    FormItem,
    Input,
    DatePicker,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    PlusCircleOutlined,
  },
  data() {
    const userId = 8;
    const education: Education = {
      certificate_degree_name: "",
      major: "",
      seeker: userId,
    };
    const listEducations: Education[] = [];
    const experience: Experience = { job_title: "", seeker: userId };
    const listExperiences: Experience[] = [];
    const skill: Skill = { skill_name: "", skill_level: "", seeker: userId };
    const listSkills: Skill[] = [];
    return {
      userId,
      education,
      listEducations,
      experience,
      listExperiences,
      skill,
      listSkills,
    };
  },
  setup() {
    const visible = ref<boolean>(false);
    const visible1 = ref<boolean>(false);
    const visible2 = ref<boolean>(false);

    const showModal1 = () => {
      visible1.value = true;
    };

    const handleOk1 = (e: MouseEvent) => {
      console.log(e);
      visible1.value = false;
    };
    const showModal2 = () => {
      visible2.value = true;
    };

    const handleOk2 = (e: MouseEvent) => {
      console.log(e);
      visible2.value = false;
    };
    const showModal = () => {
      visible.value = true;
    };

    const handleOk = (e: MouseEvent) => {
      console.log(e);
      visible.value = false;
    };
    return {
      visible,
      showModal,
      handleOk,
      visible1,
      showModal1,
      handleOk1,
      visible2,
      showModal2,
      handleOk2,
    };
  },
  mounted() {
    this.getProfile();
  },
  methods: {
    async getProfile() {
      await axios
        .get("https://api.quangdinh.me/seekers/candidate-profile/get_profile", {
          params: { id_candidate: 8 },
        })
        .then((response) => console.log(response.data));
    },
    async createEducation() {
      await axios
        .post("https://api.quangdinh.me/seekers/educations", this.education)
        .then((response) => this.listEducations.push(this.education))
        .catch((error) => error);
    },
    async createExperience() {
      await axios
        .post("https://api.quangdinh.me/seekers/experiences", this.experience)
        .then((response) => this.listExperiences.push(this.experience))
        .catch((error) => error);
    },
    async createSkill() {
      await axios
        .post("https://api.quangdinh.me/seekers/skills", this.skill)
        .then((response) => this.listSkills.push(this.skill))
        .catch((error) => error);
    },
  },
});
</script>
<style scoped>
.profile-item__form .ant-form-item {
  margin-bottom: 10px;
}
.profile-item__form .ant-picker {
  border-radius: 7px;
}
.profile-item {
  margin: 20px 0;
  border-bottom: 1px solid #e9e9e9;
  width: 90%;
}
.profile-item span {
  font-size: 15px !important;
}
.profile-item span.anticon.anticon-plus-circle {
  color: green;
}
.profile-item__btn {
  margin-bottom: 20px;
  margin-top: 10px;
  display: flex;
}
.profile-item__title {
  font-size: 21px;
  font-weight: 550;
  color: #2c3e50;
}
.content-title p {
  margin: 0;
}
.content-title-bar {
  font-size: 17px;
  font-weight: 550;
}
.content-title-bar,
.profile-item__title__detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.content-title-bar__icon {
  display: flex;
  gap: 10px;
}
.content-title-bar__icon span.anticon.anticon-delete {
  color: gray;
}
</style>
