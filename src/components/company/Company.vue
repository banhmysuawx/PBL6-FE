<template>
  <a-card hoverable v-if="company.id">
    <template #cover>
      <div class="company__logo">
        <div class="logo">
          <img v-bind:alt="company.company_name" v-bind:src="company.image" />
        </div>
        <div class="company__content">
          <div class="company__content-title" v-if="role == 'admin'">
            <router-link
              :to="{
                name: 'admin-company-detail',
                params: { id: company.id },
              }"
            >
              <p class="company__title">
                {{ company.company_name }}
              </p>
            </router-link>
            <div class="company__content-title-action">
              <a><EditOutlined @click="editCompany" /></a>
              <a-popconfirm
                title="Are you sure delete this company?"
                ok-text="Yes"
                cancel-text="No"
                @confirm="confirmDelete(company.id)"
              >
                <a><DeleteOutlined /></a>
              </a-popconfirm>
            </div>
          </div>
          <router-link
            :to="{
              name: 'company-detail',
              params: { name: company.company_name, id: company.id },
            }"
            v-else
          >
            <p class="company__title">
              {{ company.company_name }}
            </p>
          </router-link>
          <p class="company-address">{{ company.company_location }}</p>
          <a-rate v-bind:value="company.average_rating" disabled allow-half />
        </div>
      </div>
      <p class="company__description">
        {{ company.profile_description }}
      </p>
    </template>
  </a-card>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Company } from "../../utils";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import store from "../../store";
import { message } from "ant-design-vue";
import axios from "axios";
export default defineComponent({
  name: "Company",
  components: {
    EditOutlined,
    DeleteOutlined,
  },
  props: {
    company: {
      type: Object as PropType<Company>,
    },
  },
  setup() {
    return {
      role: store.state.user.role,
    };
  },
  mounted() {
    console.log(this.company?.image);
  },
  methods: {
    async confirmDelete(id: Number) {
      console.log(id);
      await axios
        .delete("companies/companies/" + id)
        .then(() => {
          delete this.company.id;
          message.success("Delete success");
        })
        .catch(() => message.error("Delete failed"));
    },
    async editCompany() {
      this.$router.push({
        name: "admin-company-detail",
        params: { id: this.company.id },
      });
    },
  },
});
</script>
<style scoped>
@import "./index.css";
.company__content-title {
  display: flex;
  justify-content: space-between;
}
.company__content-title span.anticon {
  padding: 3px !important;
}
</style>
