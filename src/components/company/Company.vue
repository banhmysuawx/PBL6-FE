<template>
  <a-card hoverable>
    <template #cover>
      <div class="company__logo">
        <div class="logo">
          <img v-bind:alt="company.company_name" v-bind:src="company.image" />
        </div>
        <div class="company__content">
          <router-link
            :to="{
              name: 'admin-company-detail',
              params: { id: company.id },
            }"
            v-if="role == 'admin'"
          >
            <p class="company__title">
              {{ company.company_name }}
            </p>
          </router-link>
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
import store from "../../store";
export default defineComponent({
  name: "Company",
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
});
</script>
<style scoped>
@import "./index.css";
</style>
