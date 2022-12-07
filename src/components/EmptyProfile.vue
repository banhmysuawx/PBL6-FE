<template>
  <div class="empty-component">
    <div class="tab-content-label">
      <h2 class="cv-missing-text">YOU CV IS MISSING</h2>
      <p class="cv-missing__description">
        Upload CV to apply for jobs faster and get attractive invitation from
        emloyers
      </p>
    </div>
    <div class="tab-content-container">
      <div class="cv-missing__wrapper">
        <a-card hoverable style="width: 300px">
          <template #cover>
            <div class="upload-file__logo">
              <CloudUploadOutlined />
            </div>
          </template>
          <div class="cv-missing__content">
            <p class="cv-missing__title">Upload CV</p>
          </div>
        </a-card>
        <a-card hoverable style="width: 300px">
          <template #cover>
            <div class="upload-file__logo">
              <ProfileOutlined />
            </div>
          </template>
          <div class="cv-missing__content">
            <p class="cv-missing__title">Create Profile</p>
          </div>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CloudUploadOutlined, ProfileOutlined } from "@ant-design/icons-vue";
</script>

<script>
export default {
  name: "EmptyProfile",
};
</script>
<style>
.ant-tabs-nav-wrap {
  height: 60px;
}
.ant-tabs-tab-btn {
  width: 160px;
}
.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
  color: #007082;
}
.ant-tabs-tab.ant-tabs-tab-active {
  color: #5c5a5b;
}
.ant-tabs-ink-bar {
  background: #007082;
  border-bottom: 3px solid #007082;
}
.ant-tabs-tab {
  font-size: 18px !important;
  font-weight: bolder;
  color: #5c5a5b;
}
.ant-tabs-content {
  margin: 0 25px 25px;
  text-align: left;
}
.empty-component .cv-missing-text {
  font-weight: 550;
  margin: 12px 0 5px;
}
.empty-component .cv-missing__description {
  font-size: 16px;
}
.empty-component .cv-missing-container {
  display: flex !important;
  gap: 0.5rem !important;
  justify-content: space-between !important;
}
.empty-component .cv-missing__wrapper {
  display: flex !important;
  position: relative !important;
  width: 100% !important;
  align-items: center !important;
  min-height: 258px;
}

.empty-component
  .cv-missing__wrapper
  .ant-card.ant-card-bordered.ant-card-hoverable {
  margin: 3px;
  text-align: center !important;
}
.empty-component .upload-file__logo svg {
  font-size: 140px;
  color: #034650;
}
.ant-card-cover > * {
  padding-top: 1rem !important;
}
.cv-missing__title {
  color: rgb(72, 69, 69) !important;
  font-size: 20px;
  font-weight: 550 !important;
  overflow: hidden;
  -webkit-line-clamp: 2;
  height: 40px;
}
.empty-component .ant-tabs-content-holder {
  overflow-y: scroll;
  height: 650px;
}
</style>
