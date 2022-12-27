<template>
  <router-link
    :to="{
      name: name,
      params: { name: company.company_name, id: company.id },
    }"
  >
    <a-card hoverable>
      <template #cover>
        <div class="top-company__logo">
          <img v-bind:alt="company.company_name" v-bind:src="image" />
        </div>
      </template>
      <a-rate v-bind:value="company.average_rating" disabled allow-half />
      <div class="top-company__content">
        <p class="top-company__title">{{ company.company_name }}</p>

        <p class="top-company__description">
          {{ company.profile_description }}
        </p>
      </div>
    </a-card>
  </router-link>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Company } from "../../utils";
import store from "../../store";
export default defineComponent({
  name: "TopCompany",
  data() {
    const role = store.state.user.role;
    const name = role === "admin" ? "admin-company-detail" : "company-detail";
    const params =
      role === "admin"
        ? { id: this.company.id }
        : { name: this.company.company_name, id: this.company.id };
    return {
      role,
      name,
      image: "https://api.quangdinh.me" + this.company?.image,
    };
  },
  props: {
    company: {
      type: Object as PropType<Company>,
    },
  },
});
</script>
<style scoped>
@import "../company/index.css";
</style>
