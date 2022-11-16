<template>
  <div class="home">
    <empty-profile />
  </div>
</template>

<script>
import EmptyProfile from "../../components/EmptyProfile.vue";

export default {
  name: "ProfileView",
  components: {
    EmptyProfile,
  },
};
</script>
