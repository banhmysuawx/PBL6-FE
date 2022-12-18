<template>
  <div class="profile-component">
    <div class="profile-item">
      <div class="profile-item__title">
        <div class="profile-item__title__detail">
          Education
          <a><PlusCircleOutlined @click="showModal" /></a>
        </div>
      </div>
      <div class="profile-item__content" v-for="education in listEducations">
        <div class="content-title">
          <div class="content-title-bar">
            {{ education.certificate_degree_name }} - {{ education.major }}
            <div class="content-title-bar__icon">
              <a><EditOutlined @click="showModal" /></a>
              <a><DeleteOutlined /></a>
            </div>
          </div>
          <p>{{ education.starting_date }} - {{ education.completion_date }}</p>
          <p v-if="education.university_name">
            {{ education.university_name }}
          </p>
          <p v-if="education.gpa">GPA: {{ education.gpa }}</p>
        </div>
      </div>
      <a-modal
        v-model:visible="visible"
        title="Add Education"
        @ok="createEducation"
        style="width: fit-content !important"
      >
        <a-form class="profile-item__form" :model="education">
          <FormItem name="major" label="Major">
            <Input
              id="major"
              placeholder="Your major name"
              v-model:value="education.major"
            ></Input>
          </FormItem>
          <FormItem name="certificate" label="Certificate Degree Name">
            <Input
              id="certificate"
              placeholder="Certificate Degree Name"
              v-model:value="education.certificate_degree_name"
            ></Input>
          </FormItem>
          <FormItem name="university" label="University Name">
            <Input
              id="university"
              placeholder="University Name"
              v-model:value="education.university_name"
            ></Input>
          </FormItem>
          <FormItem name="start" label="Starting Date">
            <a-date-picker
              style="width: 280px; height: 40px; border: 1px s"
              show-time
              type="date"
              placeholder="Starting Date"
              v-model:value="education.starting_date"
              format="YYYY-MM-DD"
            />
          </FormItem>
          <FormItem name="complete" label="Completion Date">
            <a-date-picker
              style="width: 280px; height: 40px; border: 1px s"
              show-time
              type="date"
              placeholder="Completion Date"
              v-model:value="education.completion_date"
              format="YYYY-MM-DD"
            />
          </FormItem>
          <FormItem name="gpa" label="GPA">
            <Input
              id="gpa"
              placeholder="GPA"
              v-model:value="education.gpa"
            ></Input>
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
      <div class="profile-item__content" v-for="experience in listExperiences">
        <div class="content-title">
          <div class="content-title-bar">
            {{ experience.job_title }}
            <div class="content-title-bar__icon">
              <a><EditOutlined @click="showModal2" /></a>
              <a><DeleteOutlined /></a>
            </div>
          </div>
          <p>{{ experience.start_date }} - {{ experience.end_date }}</p>
          <span v-if="experience.company">{{ experience.company }} - </span>
          <span v-if="experience.job_location">{{
            experience.job_location
          }}</span>
        </div>
      </div>
      <a-modal
        v-model:visible="visible2"
        title="Add Experience"
        @ok="createExperience"
        style="width: fit-content !important"
      >
        <a-form class="profile-item__form" :model="experience">
          <FormItem name="title" label="Job Name">
            <Input
              id="title"
              placeholder="Job Name"
              v-model:value="experience.job_title"
            ></Input>
          </FormItem>
          <FormItem name="company" label="Company Name">
            <Input
              id="company"
              placeholder="Company Name"
              v-model:value="experience.company_name"
            ></Input>
          </FormItem>
          <FormItem name="location" label="Job Location">
            <Input
              id="location"
              placeholder="Job Location"
              v-model:value="experience.job_location"
            ></Input>
          </FormItem>
          <FormItem name="description" label="Description">
            <Input
              id="description"
              placeholder="Description"
              v-model:value="experience.description"
            ></Input>
          </FormItem>
          <FormItem name="start" label="Starting Date">
            <DatePicker
              style="width: 280px; height: 40px; border: 1px s"
              show-time
              type="date"
              placeholder="Starting Date"
              v-model:value="experience.start_date"
              format="YYYY-MM-DD"
            />
          </FormItem>
          <FormItem name="complete" label="Completion Date">
            <DatePicker
              style="width: 280px; height: 40px; border: 1px s"
              show-time
              type="date"
              placeholder="Completion Date"
              v-model:value="experience.end_date"
              format="YYYY-MM-DD"
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
      <div class="profile-item__content" v-for="skill in listSkills">
        <div class="content-title">
          <div class="content-title-bar">
            {{ skill.skill_name }}
            <div class="content-title-bar__icon">
              <a><EditOutlined @click="showModal2" /></a>
              <a><DeleteOutlined /></a>
            </div>
          </div>
          <p>Level: {{ skill.skill_level }}</p>
        </div>
      </div>
      <a-modal
        v-model:visible="visible1"
        title="Add Experience"
        @ok="createSkill"
        style="width: fit-content !important"
      >
        <a-form class="profile-item__form" :model="skill">
          <FormItem name="skill-name" label="Skill Name">
            <Input
              id="skill-name"
              placeholder="Skill Name"
              v-model:value="skill.skill_name"
            ></Input>
          </FormItem>
          <FormItem name="skill-level" label="Skill Level">
            <Input
              id="skill-level"
              placeholder="Skill Level"
              v-model:value="skill.skill_level"
            ></Input>
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
import { Education, Experience, formatTime, Skill } from "../../utils";
import axios from "axios";
export { formatTime } from "../../utils";
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
    const userId = Number(localStorage.getItem("id"));
    const education: Education = {
      certificate_degree_name: "",
      major: "",
      university_name: "",
      starting_date: "",
      completion_date: "",
      gpa: 0,
      seeker: 0,
    };
    const listEducations: Education[] = [];
    const experience: Experience = {
      job_title: "",
      company_name: "",
      job_location: "",
      description: "",
      start_date: "",
      end_date: "",
      seeker: 0,
    };
    const listExperiences: Experience[] = [];
    const skill: Skill = { skill_name: "", skill_level: "", seeker: 0 };
    const listSkills: Skill[] = [];
    return {
      userId,
      education,
      listEducations,
      experience,
      listExperiences,
      skill,
      listSkills,
      seeker: 0,
    };
  },
  setup() {
    const visible = ref<boolean>(false);
    const visible1 = ref<boolean>(false);
    const visible2 = ref<boolean>(false);

    const showModal1 = () => {
      visible1.value = true;
    };

    const showModal2 = () => {
      visible2.value = true;
    };
    const showModal = () => {
      visible.value = true;
    };
    return {
      visible,
      showModal,
      visible1,
      showModal1,
      visible2,
      showModal2,
    };
  },
  mounted() {
    // this.getProfile();
    this.getInfo();
  },
  methods: {
    async getProfile() {
      let profile = await axios
        .get("seekers/candidate-profile/get_profile", {
          params: { id_candidate: this.userId },
        })
        .then((response) => response.data);
      if (!profile) {
        const input = {
          first_name: "Nguyen",
          last_name: "Tuyet",
          user: this.userId,
        };
        profile = await axios
          .post("seekers/profile", input)
          .then((response) => response.data)
          .catch((error) => error);
      }
      this.seeker = profile.id;
    },
    async createEducation() {
      this.education.seeker = this.seeker;
      this.education.starting_date = formatTime(this.education.starting_date);
      this.education.completion_date = formatTime(
        this.education.completion_date
      );
      await axios
        .post("seekers/educations", this.education)
        .then((response) => this.listEducations.push(this.education))
        .catch((error) => error);
      this.visible = false;
    },

    async createExperience() {
      this.experience.seeker = this.seeker;
      this.experience.start_date = formatTime(this.experience.start_date);
      this.experience.end_date = formatTime(this.experience.end_date);
      await axios
        .post("seekers/expirences", this.experience)
        .then((response) => this.listExperiences.push(this.experience))
        .catch((error) => error);
      this.visible2 = false;
    },

    async createSkill() {
      this.skill.seeker = this.seeker;
      await axios
        .post("seekers/skills", this.skill)
        .then((response) => this.listSkills.push(this.skill))
        .catch((error) => error);
      this.visible1 = false;
    },

    async getInfo() {
      await axios
        .get("seekers/candidate-profile/get_profile", {
          params: { id_candidate: this.userId },
        })
        .then((response) => {
          const data = response.data;
          this.seeker = data.id;
        });
      const infoEducation = axios
        .get("seekers/profile-education", {
          params: { seeker_id: this.seeker },
        })
        .then((response) => response.data)
        .catch((error) => error);

      const infoExperience = axios
        .get("seekers/profile-expirence", {
          params: { seeker_id: this.seeker },
        })
        .then((response) => response.data)
        .catch((error) => error);

      const infoSkill = axios
        .get("seekers/profile-skill", { params: { seeker_id: this.seeker } })
        .then((response) => response.data)
        .catch((error) => error);

      [this.listEducations, this.listExperiences, this.listSkills] =
        await Promise.all([infoEducation, infoExperience, infoSkill]);
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
.content-title p,
.content-title span {
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
.profile-item__content {
  border: 1px solid #e9e9e9;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 7px;
  box-shadow: 2px 2px 4px rgb(33 47 63 / 10%);
}
</style>
