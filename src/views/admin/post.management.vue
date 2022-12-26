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
            <div class="company" v-for="job in listPosts">
              <Job v-bind:job="job.job" v-bind:image="job.image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { defineComponent } from "vue";
import { useMenu } from "../../store/use-menu";
import Job from "../../components/job-view/Job.vue";
export default defineComponent({
  name: "PostManagement",
  components: {
    Job,
  },
  setup() {
    const store = useMenu();
    store.onSelectedKeys(["post-management"]);
    store.onOpenKeys(["post-management"]);
  },
  data() {
    return {
      listPosts: [],
    };
  },
  mounted() {
    this.getListPosts();
  },
  methods: {
    async getListPosts() {
      await axios
        .get("jobs/user/get_jobs")
        .then((response) => {
          const data = response.data;
          this.listPosts = data;
          console.log(this.listPosts);
        })
        .catch((error) => error);
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
  width: 50%;
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
