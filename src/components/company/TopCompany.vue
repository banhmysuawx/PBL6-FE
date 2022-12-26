<template>
  <router-link
    :to="{
      name: 'company-detail',
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
export default defineComponent({
  name: "TopCompany",
  data() {
    return {
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
