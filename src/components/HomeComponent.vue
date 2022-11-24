<template>
  <div class="container">
    <div class="search-header">
      <div class="search-form">
        <h1 class="slogan">
          {{ totalCompany }} Việc làm IT cho Developer "Chất"
        </h1>
        <form action="" class="search-form-content">
          <div class="search-form__keyword">
            <input
              class="search-form__keyword-input"
              placeholder="Tìm kiếm theo kỹ năng, chức vụ, công ty..."
            />
          </div>
          <div class="search-from__city-section">
            <select class="search-form__city-select" value="danang">
              <option value="danang">Đà Nẵng</option>
              <option value="hcm">Hồ Chí Minh</option>
              <option value="hanoi">Hà Nội</option>
            </select>
          </div>
          <div class="search-form__action-section">
            <Button
              type="primary"
              htmlType="submit"
              class="search-form__action-search"
              >Search</Button
            >
          </div>
        </form>
      </div>
    </div>
    <div class="top-companies">
      <div class="title">Top Companies</div>
      <div class="row">
        <div class="top-company" v-for="company in topCompanies">
          <a-card hoverable style="width: 300px" class="check">
            <template #cover>
              <div class="top-company__logo">
                <img alt="example" src="../assets/logo2.png" />
              </div>
            </template>
            <a-rate
              v-bind:value="company.average_rating.rating__avg"
              disabled
              allow-half
            />
            <div class="top-company__content">
              <p class="top-company__title">{{ company.company_name }}</p>
              <p class="top-company__description">
                {{ company.profile_description }}
              </p>
            </div>
          </a-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  Input,
  Button,
  Select,
  SelectOption,
  FormItem,
  Row,
  Col,
} from "ant-design-vue";
import axios from "axios";
</script>

<script>
export default {
  name: "HomeComponent",
  data() {
    return {
      topCompanies: [],
      totalCompany: 0,
    };
  },
  mounted() {
    this.getTopCompanies();
    this.getTotalJob();
  },
  methods: {
    async getTopCompanies() {
      await axios
        .get("https://api.quangdinh.me/companies/companies/top_company")
        .then((response) => {
          this.topCompanies = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getTotalJob() {
      await axios
        .get("https://api.quangdinh.me/jobs/jobs/sum_jobs")
        .then((response) => {
          this.totalCompany = response.data.count;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.container {
  background: #f9f8f8;
}
.search-header {
  background: #007082;
}
.search-form {
  max-width: 1024px;
  padding: 40px 15px 60px 15px;
  margin: 0 auto;
  text-align: left;
}
.search-form .slogan {
  color: rgb(255, 255, 255);
  padding-bottom: 5px;
  font-family: Roboto, sans-serif;
  font-size: 40px;
}
.search-form-content {
  padding: 20px 0px;
  display: flex;
}
.search-form__keyword {
  display: flex;
  flex-grow: 1;
  height: 50px;
  margin-right: 10px;
}
.search-form__keyword-input {
  font-family: inherit;
  font-size: 17px;
  width: 100%;
  border-radius: 0.25rem !important;
  border: 1px solid #bebebe;
}
.search-from__city-section {
  display: flex;
  flex-grow: 0.1;
  height: 50px;
  margin-right: 10px;
}
.search-form__city-select {
  width: 100%;
  text-align: center;
  font-family: inherit;
  font-size: 17px;
  border-radius: 0.25rem !important;
  border: none;
}
.search-form__action-section {
  display: flex;
  flex-grow: 0.2;
}
.search-form__action-search {
  height: 50px;
  width: 100%;
  font-size: 23px;
  font-family: inherit;
  text-align: center;
  font-weight: bold;
  background: rgb(188, 71, 108);
}
.top-companies {
  background: white;
  display: flex;
  flex-direction: column;
  max-width: 1350px;
  margin: auto;
  margin-top: 20px;
}
.top-companies .title {
  font-size: 27px;
  font-family: Roboto, sans-serif;
  text-align: left;
  margin-top: 30px;
  margin-left: 12px;
  line-height: 35px;
}
.row {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  margin-top: 12px;
  margin-right: 12px;
  margin-left: 12px;
  margin-bottom: 20px;
}
.top-company {
  width: 25%;
  margin-top: 30px;
}
.ant-card {
  padding: 12px;
  border-radius: 4px;
  box-shadow: 2px 2px 12px rgb(33 47 63 / 10%);
}
.top-company__logo {
  height: 160px;
}
.ant-card-cover img {
  display: block;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  max-width: 140px;
  max-height: 140px;
  width: auto;
  height: auto;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 10px;
  line-height: 170px;
}
.ant-rate {
  font-size: 16px !important;
  margin-top: 5px;
  margin-bottom: 10px;
}
/* .ant-card-meta-title {
  font-size: 20px;
} */
.top-company__content {
  font-family: "Roboto", sans-serif;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  line-height: 20px;
}
.top-company__description {
  color: rgb(127, 124, 124) !important;
  overflow: hidden;
  -webkit-line-clamp: 2;
  height: 40px;
}
.top-company__title {
  color: rgb(72, 69, 69) !important;
  font-size: 18px;
  font-weight: 550 !important;
  overflow: hidden;
  -webkit-line-clamp: 2;
  height: 40px;
}
</style>
