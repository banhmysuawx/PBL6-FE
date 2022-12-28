<template>
  <div class="home">
    <div class="container">
      <div class="account-header">
        <div class="total">{{ total }} seekers</div>
        <div class="filter-container">
          <div class="search-item">
            <a-input v-model:value="text"></a-input>
          </div>
          <div class="filter">
            <a-dropdown>
              <template #overlay>
                <a-menu v-model:value="status">
                  <a-menu-item value="dissbled"> disable </a-menu-item>
                  <a-menu-item value="enabled"> enable </a-menu-item>
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
      </div>
      <div class="companies-container">
        <div class="list-companies">
          <div class="row">
            <div class="company" v-for="seeker in listSeekers">
              <router-link
                :to="{
                  name: 'seeker-detail',
                  params: { id: seeker.user.id },
                }"
              >
                <a-card hoverable>
                  <template #cover>
                    <div class="company__logo">
                      <div class="logo">
                        <img :src="require('../../assets/logo2.png')" alt="" />
                      </div>
                      <div class="company__content">
                        <p class="company__title">
                          {{ seeker.seeker.first_name.toUpperCase() }}
                          {{ seeker.seeker.last_name.toUpperCase() }}
                        </p>
                        <p class="company-address">Da Nang</p>
                        <div class="tag" v-for="skill in seeker.skills">
                          <p>{{ skill.skill_name }}</p>
                        </div>
                      </div>
                    </div>
                    <p class="company__description"></p>
                  </template>
                </a-card>
              </router-link>
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
import { useMenu } from "../../store/use-menu";
export default defineComponent({
  name: "SeekerManagement",
  components: {
    CaretDownFilled,
    Company,
  },
  setup() {
    const store = useMenu();
    store.onSelectedKeys(["seeker-management"]);
    store.onOpenKeys(["seeker-management"]);
  },
  data() {
    return {
      listSeekers: [],
      total: 0,
    };
  },
  mounted() {
    this.getListSeekers();
  },
  methods: {
    async getListSeekers() {
      await axios
        .get("seekers/candidate-profile/get_all_information")
        .then((response) => {
          this.listSeekers = response.data;
          this.total = this.listSeekers.length;
        })
        .catch((error) => error);
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
</style>
