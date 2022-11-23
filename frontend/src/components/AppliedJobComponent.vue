<template>
  <div class="applied-job" v-for="i in 10">
    <a-card hoverable>
      <template #cover style="border: 1px solid #e9e9e9">
        <div class="top-company__logo">
          <img alt="example" src="../assets/logo2.png" />
        </div>
      </template>
      <div class="content-container">
        <div class="top-company__content">
          <p class="top-company__title">
            IT Project (Sharepoint Project And Helpdesk Project) - Fulltime
            Remote
          </p>
          <p class="top-company__description">
            CÔNG TY TNHH MỘT THÀNH VIÊN PHÁT TRIỂN DỊCH VỤ CÔNG NGHỆ
          </p>
        </div>
        <div class="star">
          <DeleteOutlined />
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import { DeleteOutlined } from "@ant-design/icons-vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppliedJobComponent",
  components: {
    DeleteOutlined,
  },
});
</script>
<style scoped>
.applied-job {
  margin: 10px 100px;
  width: 80%;
}
.applied-job img {
  max-width: 200px;
}
.applied-job .ant-card.ant-card-bordered.ant-card-hoverable {
  display: flex;
}
.applied-job .ant-card.ant-card-bordered.ant-card-hoverable {
  height: 150px;
  background: #f4feff;
  border-radius: 10px;
}
.applied-job .top-company__logo {
  height: 100%;
  border-right: 1px solid #e9e9e9;
  padding: 1rem 1.5rem;
}
.applied-job .top-company__logo img {
  display: block;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  max-width: 140px;
  max-height: 140px;
  width: auto;
  height: auto;
  margin: auto;
  line-height: 170px;
}
.applied-job .top-company__content {
  height: 100%;
  text-align: left;
}
.applied-job .top-company__title {
  font-size: 20px;
  font-weight: 550;
  overflow: hidden;
  -webkit-line-clamp: 2;
  height: 60px;
}
.applied-job .top-company__description {
  overflow: hidden;
  -webkit-line-clamp: 1;
  height: 30px;
}
.content-container {
  display: flex;
}
.applied-job .star {
  margin: auto 5px;
  margin-bottom: 24px;
  padding: 0 4px;
  background: #f4f4f4;
}
.applied-job .star span.anticon.anticon-delete {
  color: #999;
}
</style>
