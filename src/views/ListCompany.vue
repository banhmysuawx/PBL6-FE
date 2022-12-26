<template>
  <div class="home">
    <a-layout>
      <Header />
      <a-layout-content>
        <div class="search-company">
          <div class="search-form">
            <h1 class="slogan">
              {{ totalCompany }} Jobs for "Cools" Developer
            </h1>
            <form action="" class="search-form-content">
              <div class="search-form__keyword">
                <input
                  class="search-form__keyword-input"
                  placeholder="Nhập tên công ty"
                />
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
        <div class="list-company-container">
          <div class="list-companies">
            <div class="title">List Companies</div>
            <div class="row">
              <div class="company" v-for="company in listCompany">
                <Company v-bind:company="company" />
              </div>
            </div>
          </div>
          <div class="space"></div>
        </div>
      </a-layout-content>
      <Footer />
    </a-layout>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Header from "../layouts/header.vue";
import Footer from "../layouts/footer.vue";
import Company from "../components/company/Company.vue";
import axios from "axios";
export default defineComponent({
  name: "ListCompany",
  components: {
    Header,
    Footer,
    Company,
  },
  data() {
    return {
      listCompany: [],
    };
  },
  mounted() {
    this.getListCompany();
  },
  methods: {
    async getListCompany() {
      await axios
        .get("companies/companies")
        .then((response) => {
          const listCompany = response.data.results;
          this.listCompany = listCompany;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>
<style scoped>
.home main.ant-layout-content {
  position: relative;
  top: 64px;
  background-color: #f9f8f8;
}
.list-companies {
  background: white;
  display: flex;
  flex-direction: column;
  max-width: 1350px;
  margin: auto;
  margin-top: 20px;
}
.list-companies .title {
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
.company {
  width: 33%;
  padding: 12px;
}

.space {
  height: 40px;
}
.search-company {
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
</style>
