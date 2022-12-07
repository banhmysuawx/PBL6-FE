<template>
  <div>
    <el-container class="layout-container-demo">
      <SideBar />
      <el-container>
        <el-header style="height: 50px"><HeaderCompanyView /></el-header>
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
              <el-button type="primary" @click="CreateLocation()">+</el-button>
            </div>

            <div
              class="item-location"
              v-for="item in list_location"
              :key="item"
            >
              <el-icon color="red"><location /></el-icon>
              <span @click="ChoiceLocation(item)">
                {{ item.location_name }}</span
              >
              <el-button link
                ><Edit style="width: 1em; height: 1em; margin-left: 10px"
              /></el-button>
              <el-button link @click="outerVisible = true"
                ><Delete style="width: 1em; height: 1em; margin-left: 5px"
              /></el-button>
            </div>
          </el-aside>
          <el-main>
            <el-form v-if="location_choice != '' && is_create == false">
              <el-form-item>
                <el-col :span="8">
                  <label>Location Name</label>
                </el-col>
                <el-col :span="16">
                  <el-input
                    placeholder="Please enter location name"
                    v-model="this.location.location_name"
                  ></el-input>
                </el-col>
              </el-form-item>

              <el-form-item>
                <el-col :span="8">
                  <label>Country</label>
                </el-col>
                <el-col :span="6">
                  <el-input
                    placeholder="Please enter country"
                    v-model="this.location.country"
                  ></el-input>
                </el-col>
              </el-form-item>

              <el-form-item>
                <el-col :span="8">
                  <label>Stage</label>
                </el-col>
                <el-col :span="16">
                  <el-input
                    placeholder="Please enter stage"
                    v-model="this.location.state"
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
                    v-model="this.location.street_address"
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
            </el-form>
            <el-form v-if="is_create == true">
              <el-form-item>
                <el-col :span="8">
                  <label>Location Name</label>
                </el-col>
                <el-col :span="16">
                  <el-input
                    placeholder="Please enter location name"
                    v-model="this.create_location.location_name"
                  ></el-input>
                </el-col>
              </el-form-item>

              <el-form-item>
                <el-col :span="8">
                  <label>Country</label>
                </el-col>
                <el-col :span="6">
                  <el-input
                    placeholder="Please enter country"
                    v-model="this.create_location.country"
                  ></el-input>
                </el-col>
              </el-form-item>

              <el-form-item>
                <el-col :span="8">
                  <label>Stage</label>
                </el-col>
                <el-col :span="16">
                  <el-input
                    placeholder="Please enter stage"
                    v-model="this.create_location.state"
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
                    v-model="this.create_location.city"
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
                    v-model="this.create_location.street_address"
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
                    v-model="this.create_location.zip"
                  ></el-input>
                </el-col>
              </el-form-item>

              <el-col style="text-align: right; width: 750px"
                ><el-button type="primary" @click="SaveLocation()"
                  >Save</el-button
                ></el-col
              >
            </el-form>
            <div v-if="location_choice == '' && is_create == false">
              <el-row></el-row>
              <el-row>
                <el-col :span="1"></el-col>
                <el-col :span="3">No data to show</el-col>
              </el-row>
            </div>
          </el-main>
        </el-container>
      </el-container>
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
import HeaderCompanyView from "@/components/HeaderCompany.vue";
import axios from "axios";
import { toast } from "bulma-toast";

export default {
  name: "AddLocation",
  data() {
    return {
      location_choice: "",
      list_location: [],
      location: {
        location_name: "",
        country: "",
        state: "",
        city: "",
        street_address: "",
        zip: "",
      },
      create_location: {
        location_name: "",
        country: "",
        state: "",
        city: "",
        street_address: "",
        zip: "",
      },
      outerVisible: false,
      is_create: false,
    };
  },
  components: {
    SideBar,
    HeaderCompanyView,
  },
  mounted() {
    const id = this.$store.state.company.id;
    axios
      .get(`/jobs/company/get_location?company_id=${id}`)
      .then((response) => {
        this.list_location = response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    blurLocation() {
      console.log("hello");
    },

    ChoiceLocation(item) {
      this.is_create = false;
      this.location_choice = item;
      axios
        .get(`/jobs/locations/${item.id}`)
        .then((response) => {
          this.location = response.data;
          console.log(this.location);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    CreateLocation() {
      this.is_create = true;
    },

    async SaveLocation() {
      const id = this.$store.state.company.id;
      const data = {
        location_name: this.create_location.location_name,
        street_address: this.create_location.street_address,
        city: this.create_location.city,
        state: this.create_location.state,
        country: this.create_location.country,
        zip: this.create_location.zip,
        company: id,
      };
      console.log(data);
      await axios
        .post("/jobs/locations", data)
        .then((response) => {
          console.log(response.data);
          this.location_choice = response.data;
        })
        .catch((err) => {
          console.log(err);
        });

      await axios
        .get(`/jobs/company/get_location?company_id=${id}`)
        .then((response) => {
          this.list_location = response.data;
          toast({
            message: "Create Location successful",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: "bottom-right",
          });
          this.is_create = false;
          this.create_location.location_name = "";
          this.create_location.country = "";
          this.create_location.state = "";
          this.create_location.city = "";
          this.create_location.street_address = "";
          this.create_location.zip = "";
        })
        .catch((err) => {
          console.log(err);
        }),
        await axios
          .get(`/jobs/locations/${this.location_choice.id}`)
          .then((response) => {
            this.location = response.data;
            console.log(this.location);
          })
          .catch((err) => {
            console.log(err);
          });
    },
  },
};
</script>

<style lang="scss">
@import "../../../assets/css/index.css";
@import "index.css";
</style>
