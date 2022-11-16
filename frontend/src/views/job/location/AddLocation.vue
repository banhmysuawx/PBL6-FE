<template>
  <div>
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
        <div class="item-location" style="text-align: center">
          <el-button type="primary">+</el-button>
        </div>

        <div class="item-location">
          <el-icon color="red"><location /></el-icon>
          <span> Ho Chi Minh city</span>
          <el-button link
            ><Edit style="width: 1em; height: 1em; margin-left: 10px"
          /></el-button>
          <el-button link @click="outerVisible = true"
            ><Delete style="width: 1em; height: 1em; margin-left: 5px"
          /></el-button>
        </div>

        <div class="item-location" @mouseover="blurLocation()">
          <el-icon color="red"><location /></el-icon>
          <span> Da Nang city</span>
          <el-button link
            ><Edit style="width: 1em; height: 1em; margin-left: 10px"
          /></el-button>
          <el-button link @click="outerVisible = true"
            ><Delete style="width: 1em; height: 1em; margin-left: 5px"
          /></el-button>
        </div>
      </el-aside>
      <el-main>
        <el-form>
          <el-form-item>
            <el-col :span="8">
              <label>Location Name</label>
            </el-col>
            <el-col :span="16">
              <el-input
                placeholder="Please enter location name"
                v-model="this.location.name"
              ></el-input>
            </el-col>
          </el-form-item>

          <el-form-item>
            <el-col :span="8">
              <label>Country</label>
            </el-col>
            <el-col :span="6" v-model="this.location.country">
              <el-select v-model="value" placeholder="----Select Country----">
                <el-option label="item1" value="item1" key="item1" />
                <el-option label="item2" value="item2" />
                <el-option label="item3" value="item3" />
                <el-option label="item4" value="item4" />
              </el-select>
            </el-col>
          </el-form-item>

          <el-form-item>
            <el-col :span="8">
              <label>Stage</label>
            </el-col>
            <el-col :span="16">
              <el-input
                placeholder="Please enter stage"
                v-model="this.location.stage"
              ></el-input>
            </el-col>
          </el-form-item>

          <el-form-item>
            <el-col :span="8">
              <label>City</label>
            </el-col>
            <el-col :span="16">
              <el-input
                placeholder="Please enter city"
                v-model="this.location.city"
              ></el-input>
            </el-col>
          </el-form-item>

          <el-form-item>
            <el-col :span="8">
              <label>Street</label>
            </el-col>
            <el-col :span="16">
              <el-input
                placeholder="Please enter street"
                v-model="this.location.street"
              ></el-input>
            </el-col>
          </el-form-item>

          <el-form-item>
            <el-col :span="8">
              <label>Code Zip</label>
            </el-col>
            <el-col :span="16">
              <el-input
                placeholder="Please enter code zip"
                v-model="this.location.zip"
              ></el-input>
            </el-col>
          </el-form-item>

          <el-col style="text-align: right; width: 750px"
            ><el-button type="primary">Save</el-button></el-col
          >
        </el-form>
      </el-main>
    </el-container>
    <el-dialog
      v-model="outerVisible"
      title="Are you sure delete this location?"
    >
      <template #default>
        <el-dialog
          v-model="innerVisible"
          width="30%"
          title="Inner Dialog"
          append-to-body
        />
      </template>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="outerVisible = false">No</el-button>
          <el-button type="primary" @click="innerVisible = true">
            Yes
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import HeaderView from "@/components/Header.vue";
import { useMenu } from "../../../store/use-menu.js";

export default {
  name: "AddLocation",
  setup() {
    const store = useMenu();
    store.onSelectedKeys(["addLocation"]);
    store.onOpenKeys(["addLocation"]);
  },
  data() {
    return {
      location: {
        name: "",
        country: "",
        stage: "",
        city: "",
        street: "",
        zip: "",
      },
      outerVisible: false,
    };
  },
  components: {
    SideBar,
    HeaderView,
  },
  methods: {
    blurLocation() {
      console.log("hello");
    },
  },
};
</script>

<style lang="scss">
@import "../../../assets/css/index.css";
@import "index.css";
</style>
