<template>
  <a-card hoverable>
    <template #cover>
      <div class="company__logo">
        <div class="logo">
          <!-- <router-link
            :to="{
              name: 'company-detail',
              params: { name: company.company_name, id: company.id },
            }"
          > -->
          <img v-bind:alt="company.company_name" v-bind:src="company.image" />
          <!-- </router-link> -->
        </div>
        <div class="company__content">
          <router-link
            :to="{
              name: 'company-detail',
              params: { name: company.company_name, id: company.id },
            }"
            ><p class="company__title">
              {{ company.company_name }}
            </p></router-link
          >
          <p class="company-address">{{ company.company_location }}</p>
          <a-rate
            v-bind:value="company.average_rating.rating__avg"
            disabled
            allow-half
          />
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
export default defineComponent({
  name: "Company",
  props: {
    company: {
      type: Object as PropType<Company>,
    },
  },
});
</script>
<style scoped>
@import "./index.css";
</style>
