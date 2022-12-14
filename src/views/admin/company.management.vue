<template>
  <div class="home">
    <div class="container">
      <div class="filter-container">
        <div class="search-item">
          <a-input></a-input>
        </div>
        <div class="filter">
          <a-dropdown>
            <template #overlay>
              <a-menu>
                <a-menu-item key="Da Nang"> Da Nang </a-menu-item>
                <a-menu-item key="Ha Noi"> Ha Noi </a-menu-item>
                <a-menu-item key="Ho Chi Minh"> Ho Chi Minh </a-menu-item>
                <a-menu-item key="other"> Others </a-menu-item>
              </a-menu>
            </template>
            <a-button>
              Address
              <CaretDownFilled />
            </a-button>
          </a-dropdown>
        </div>
        <div class="filter">
          <a-dropdown>
            <template #overlay>
              <a-menu>
                <a-menu-item key="dissble"> disable </a-menu-item>
                <a-menu-item key="enable"> enable </a-menu-item>
              </a-menu>
            </template>
            <a-button>
              Status
              <CaretDownFilled />
            </a-button>
          </a-dropdown>
        </div>
        <div class="action">
          <a-button class="filter-btn">Filter</a-button>
        </div>
      </div>
      <div class="companies-container">
        <div class="total-companies">Total: 10</div>
        <div class="list-companies">
          <div class="row">
            <div class="company" v-for="company in listCompanies">
              <Company v-bind:company="company" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { CaretDownFilled } from "@ant-design/icons-vue";
import Company from "../../components/company/Company.vue";
import axios from "axios";
export default defineComponent({
  name: "CompanyManagement",
  components: {
    CaretDownFilled,
    Company,
  },
  data() {
    return {
      listCompanies: [],
    };
  },
  mounted() {
    this.getListCompany();
  },
  methods: {
    async getListCompany() {
      await axios
        .get("https://api.quangdinh.me/companies/companies")
        .then((response) => {
          this.listCompanies = response.data.results;
        })
        .catch((error) => console.log(error));
    },
  },
});
</script>
<style scoped>
.container {
  background: white;
}
.account-container {
  max-width: 1350px;
  margin: auto;
  margin-top: 20px;
}
.filter-container {
  display: flex;
  max-width: 1350px !important;
  margin: 30px auto;
  width: fit-content;
  margin-right: 0;
  margin-top: 50px;
}
.filter {
  padding-right: 20px;
}
.filter button.ant-btn.ant-dropdown-trigger {
  font-size: 14px;
  height: 35px;
  padding: 3px 10px;
  border-radius: 10px;
}
.filter span.anticon.anticon-caret-down {
  margin-left: 20px;
}
.span.anticon.anticon-caret-down {
  margin-right: 0;
}
.search-item {
  margin-right: 20px;
}
.search-item input.ant-input {
  width: 200px !important;
  height: 35px;
}
.filter-btn {
  margin-right: 20px;
  border-radius: 7px;
  background: #007082;
  color: white;
}
.company {
  width: 33%;
  padding: 12px;
}
.list-companies {
  background: white;
  display: flex;
  flex-direction: column;
  max-width: 1350px;
  margin: auto;
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
.ant-card-cover .company__logo img {
  transform: translateY(0%) !important;
}
.total-companies {
  text-align: left;
  padding-left: 30px;
  font-size: 18px;
  font-family: Tahoma, sans-serif;
  color: rgb(188, 71, 108);
}
</style>
