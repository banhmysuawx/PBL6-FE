<template>
  <el-container class="layout-container-demo">
    <el-container>
      <el-aside style="width: 300px">
        <div class="search-container">
          <el-row :justify="center" class="row-bg">
            <el-col :span="16"
              ><div class="grid-content ep-bg-purple-dark" />
              <el-input v-model="input" placeholder="Please input" />
            </el-col>
            <el-col :span="8"
              ><div class="grid-content ep-bg-purple-dark" />
              <el-button type="primary">Search</el-button>
            </el-col>
          </el-row>
        </div>
      </el-aside>
      <el-main>
        <el-form>
          <el-form-item>
            <el-col :span="8">
              <label>Skill Name</label>
            </el-col>
            <el-col :span="16">
              <el-input
                placeholder="Please enter skill name"
                v-model="this.skill.name"
              ></el-input>
            </el-col>
          </el-form-item>

          <el-form-item>
            <el-col :span="8">
              <label>Level Name</label>
            </el-col>
            <el-col :span="16">
              <el-input
                placeholder="Please enter level name"
                v-model="this.skill.level_name"
              ></el-input>
            </el-col>
          </el-form-item>

          <el-form-item>
            <el-col :span="8">
              <label>Description</label>
            </el-col>
            <el-col :span="16">
              <el-input
                placeholder="Please enter description"
                v-model="this.skill.description"
                type="textarea"
              ></el-input>
            </el-col>
          </el-form-item>

          <el-col style="text-align: right; width: 750px"
            ><el-button type="primary">Save</el-button></el-col
          >
        </el-form>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import HeaderView from "@/components/Header.vue";
import { useMenu } from "../../../store/use-menu";

export default {
  name: "AddLocation",
  setup() {
    const store = useMenu();
    store.onSelectedKeys(["addSkill"]);
    store.onOpenKeys(["addSkill"]);
  },
  data() {
    return {
      skill: {
        name: "",
        level_name: "",
        description: "",
      },
    };
  },
  components: {
    SideBar,
    HeaderView,
  },
};
</script>

<style lang="scss">
.search-container {
  margin-left: 15px;
}
.layout-container-demo .el-header {
  display: flex;
  position: relative;
  background-color: rgb(232, 232, 232);
  color: var(--el-text-color-primary);
  justify-content: flex-end;
  font-size: 25px;
  margin-bottom: 2px;
  align-items: center;
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: rgb(240, 240, 240);
  width: 300px;
  //height: 1050px;
  height: 100vh;
  margin-right: 1px;
}

.layout-container-demo .el-menu {
  border-right: none;
  background: rgb(220, 220, 220);
  margin-left: 10px;
}
.layout-container-demo .el-main {
  padding: 0;
  background: rgb(240, 240, 240);
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}

.el-form {
  display: box;
  margin-top: 20px;
  margin-left: 30px;
}

.el-form-item {
  width: 800px;
}

.grid-content {
  min-height: 36px;
}
</style>
