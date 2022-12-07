<template>
  <div class="search-header">
    <div class="search-form">
      <h1 class="slogan">
        {{ totalCompany }} Việc làm IT cho Developer "Chất"
      </h1>
      <form action="" class="search-form-content">
        <div class="search-form__keyword">
          <input
            class="search-form__keyword-input"
            placeholder="Tìm kiếm theo kỹ năng, chức vụ, công ty..."
          />
        </div>
        <div class="search-from__city-section">
          <select class="search-form__city-select" value="danang">
            <option value="danang">Đà Nẵng</option>
            <option value="hcm">Hồ Chí Minh</option>
            <option value="hanoi">Hà Nội</option>
          </select>
        </div>
        <div class="search-form__action-section">
          <Button
            type="primary"
            htmlType="submit"
            class="search-form__action-search"
            >Search</Button
          >
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Button } from "ant-design-vue";
export default defineComponent({
  name: "PageHeader",
  props: {
    totalCompany: Number,
  },
  components: {
    Button,
  },
});
</script>
<style scoped>
.search-header {
  background: #007082;
}
.search-form {
  max-width: 1024px;
  padding: 40px 15px 60px 15px;
  margin: 0 auto;
  text-align: left;
}
.search-form .slogan {
  color: rgb(255, 255, 255);
  padding-bottom: 5px;
  font-family: Roboto, sans-serif;
  font-size: 40px;
}
.search-form-content {
  padding: 20px 0px;
  display: flex;
}
.search-form__keyword {
  display: flex;
  flex-grow: 1;
  height: 50px;
  margin-right: 10px;
}
.search-form__keyword-input {
  font-family: inherit;
  font-size: 17px;
  width: 100%;
  border-radius: 0.25rem !important;
  border: 1px solid #bebebe;
}
.search-from__city-section {
  display: flex;
  flex-grow: 0.1;
  height: 50px;
  margin-right: 10px;
}
.search-form__city-select {
  width: 100%;
  text-align: center;
  font-family: inherit;
  font-size: 17px;
  border-radius: 0.25rem !important;
  border: none;
}
.search-form__action-section {
  display: flex;
  flex-grow: 0.2;
}
.search-form__action-search {
  height: 50px;
  width: 100%;
  font-size: 23px;
  font-family: inherit;
  text-align: center;
  font-weight: bold;
  background: rgb(188, 71, 108);
}
</style>
