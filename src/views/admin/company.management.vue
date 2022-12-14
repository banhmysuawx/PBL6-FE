<template>
  <div class="home">
    <div class="container">
      <div class="account-header">
        <div class="total">{{ total }} companies</div>
        <div class="filter-container">
          <div class="search-item">
            <a-input v-model:value="text"></a-input>
          </div>
          <div class="action">
            <a-button class="filter-btn" @click="filterCompany(text)"
              >Filter</a-button
            >
          </div>
        </div>
      </div>
      <div class="companies-container">
        <div class="list-companies">
          <div class="row">
            <div class="company" v-for="company in listCompanies">
              <Company v-bind:company="company" v-if="!key" />
              <TopCompany v-bind:company="company" v-else />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { CaretDownFilled } from "@ant-design/icons-vue";
import Company from "../../components/company/Company.vue";
import TopCompany from "../../components/company/TopCompany.vue";
import axios from "axios";
export default defineComponent({
  name: "CompanyManagement",
  components: {
    CaretDownFilled,
    Company,
    TopCompany,
  },
  data() {
    return {
      listCompanies: [],
      listCompaniesClone: [],
      key: true,
      total: 0,
      text: "",
    };
  },
  mounted() {
    if (this.$route.query.key) {
      this.key = true;
      this.getTopCompanies();
    } else {
      this.key = false;
      this.getListCompany();
    }
  },
  watch: {
    $route() {
      if (this.$route.query.key) {
        this.key = true;
        this.getTopCompanies();
      } else {
        this.key = false;
        this.getListCompany();
      }
    },
    text() {
      this.filterCompany(this.text);
    },
  },
  methods: {
    async getListCompany() {
      await axios
        .get("companies/companies")
        .then((response) => {
          this.listCompanies = response.data.results;
          this.total = this.listCompanies.length;
          this.listCompaniesClone = response.data.results;
          console.log(this.listCompanies);
        })
        .catch((error) => console.log(error));
    },
    async getTopCompanies() {
      await axios
        .get("companies/companies/top_company")
        .then((response) => {
          this.listCompanies = response.data;
          this.total = this.listCompanies.length;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    filterCompany(text: string) {
      this.listCompanies = this.listCompaniesClone;
      if (Array.isArray(this.listCompanies) && text.length != 0) {
        this.listCompanies = this.listCompanies.filter(
          (item: { company_location: string; company_name: string }) =>
            item.company_location.toLowerCase().includes(text.toLowerCase()) ||
            item.company_name.toLowerCase().includes(text.toLowerCase())
        );
        this.total = this.listCompanies.length;
      }
    },
  },
});
</script>
<style scoped>
.container {
  background: white;
  overflow-y: scroll;
  height: 700px;
}
.account-header {
  display: flex;
  justify-content: space-between;
  margin: 50px 20px 30px 50px;
}
.account-header .total {
  margin-right: 20px;
  font-size: 17px;
  color: #007082;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  border: 1px solid #e9e9e9;
  border-radius: 5px;
  padding: 5px 10px;
}
.account-container {
  max-width: 1350px;
  margin: auto;
  margin-top: 20px;
}
.filter-container {
  display: flex;
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
.account-container {
  padding: 0 40px;
}
.ant-form-item {
  margin-bottom: 12px;
  font-size: 10px;
}
.ant-form-item .ant-select,
.filter-container .ant-cascader-picker {
  width: 280px;
  height: 35px !important;
  border-radius: 7px;
}
.ant-form-item .ant-select-selector {
  border-radius: 7px;
}
.account-table thead.ant-table-thead {
  font-weight: 550 !important;
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
</style>
