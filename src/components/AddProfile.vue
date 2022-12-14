<template>
  <div class="profile-user">
    <a-collapse>
      <a-collapse-panel :show-arrow="false" key="1" header="Summary">
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<script>
export default {
  name: "AddProfile",
};
</script>

<style scoped>
.profile-user .ant-collapse {
  border: 0px !important;
}
.profile-user .ant-collapse-content,
.profile-user .ant-collapse-item.ant-collapse-item-active {
  border-bottom: 0px !important;
}

.profile-user .ant-collapse-header {
  border-bottom: 1px solid #e9e9e9;
}
</style>
