<template>
  <div>
    <el-container class="layout-container-demo">
      <SideBar />
      <el-container>
        <el-header style="height: 80px; background: #007082; padding: 0"
          ><HeaderCompanyView
        /></el-header>
        <el-container class="add-location">
          <el-aside class="side" style="width: 350px">
            <div class="search-container">
              <div class="search-input">
                <a-input
                  v-model="text"
                  placeholder="Please input"
                  @keyup="Search()"
                />
              </div>
              <div class="create-btn">
                <a-button type="primary" @click="CreateLocation()">+</a-button>
              </div>
            </div>
            <div class="list-location">
              <h2>List Locations</h2>
              <div
                class="item-location"
                v-for="item in list_location"
                :key="item"
              >
                <div class="location-icon">
                  <el-icon color="red"><location /></el-icon>
                  <span @click="ChoiceLocation(item)">{{
                    item.location_name
                  }}</span>
                </div>
                <div class="location-delete">
                  <el-button link @click="DeleteLocation(item.id)"
                    ><Delete style="width: 1em; height: 1em; margin-left: 5px"
                  /></el-button>
                </div>
              </div>
            </div>
          </el-aside>
          <el-main>
            <el-card class="card-location">
              <a-form v-if="location_choice != '' && is_create == false">
                <a-form-item>
                  <div class="display-grid">
                    <label>Location Name</label>
                    <a-input
                      placeholder="Please enter location name"
                      v-model:value="this.location.location_name"
                    ></a-input>
                  </div>
                </a-form-item>

                <a-form-item>
                  <div class="display-grid">
                    <label>Country</label>
                    <a-input
                      placeholder="Please enter country"
                      v-model:value="this.location.country"
                    ></a-input>
                  </div>
                </a-form-item>

                <a-form-item>
                  <div class="display-grid">
                    <label>Stage</label>
                    <a-input
                      placeholder="Please enter stage"
                      v-model:value="this.location.state"
                    ></a-input>
                  </div>
                </a-form-item>

                <a-form-item>
                  <div class="display-grid">
                    <label>City</label>
                    <a-input
                      placeholder="Please enter city"
                      v-model:value="this.location.city"
                    ></a-input>
                  </div>
                </a-form-item>

                <a-form-item>
                  <div class="display-grid">
                    <label>Street</label>
                    <a-input
                      placeholder="Please enter street"
                      v-model:value="this.location.street_address"
                    ></a-input>
                  </div>
                </a-form-item>

                <a-form-item>
                  <div class="display-grid">
                    <label>Code Zip</label>
                    <a-input
                      placeholder="Please enter code zip"
                      v-model:value="this.location.zip"
                    ></a-input>
                  </div>
                </a-form-item>
              </a-form>
              <a-form v-if="is_create == true" class="form">
                <a-form-item>
                  <div class="display-grid">
                    <label>Location Name</label>
                    <a-input
                      placeholder="Please enter location name"
                      v-model:value="this.create_location.location_name"
                    ></a-input>
                  </div>
                </a-form-item>

                <a-form-item>
                  <div class="display-grid">
                    <label>Country</label>
                    <a-input
                      placeholder="Please enter country"
                      v-model:value="this.create_location.country"
                    ></a-input>
                  </div>
                </a-form-item>

                <a-form-item>
                  <div class="display-grid">
                    <label>Stage</label>
                    <a-input
                      placeholder="Please enter stage"
                      v-model:value="this.create_location.state"
                    ></a-input>
                  </div>
                </a-form-item>

                <a-form-item>
                  <div class="display-grid">
                    <label>City</label>
                    <a-input
                      placeholder="Please enter city"
                      v-model:value="this.create_location.city"
                    ></a-input>
                  </div>
                </a-form-item>

                <a-form-item>
                  <div class="display-grid">
                    <label>Street</label>
                    <a-input
                      placeholder="Please enter street"
                      v-model:value="this.create_location.street_address"
                    ></a-input>
                  </div>
                </a-form-item>

                <a-form-item>
                  <div class="display-grid">
                    <label>Code Zip</label>
                    <a-input
                      placeholder="Please enter code zip"
                      v-model:value="this.create_location.zip"
                    ></a-input>
                  </div>
                </a-form-item>
                <a-button type="primary" @click="SaveLocation()">Save</a-button>
              </a-form>
              <div v-if="location_choice == '' && is_create == false">
                <EmptyApplied />
              </div>
            </el-card>
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
          <el-button type="primary" @click="Delete()"> Yes </el-button>
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
import EmptyApplied from "../../../components/EmptyApplied.vue";
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
      text: "",
      id_location: 0,
    };
  },
  components: {
    SideBar,
    HeaderCompanyView,
    EmptyApplied,
  },
  created() {
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
    Search() {
      console.log(this.text);
      const id = this.$store.state.company.id;

      axios
        .get(`/jobs/company/filter?company_id=${id}&text=${this.text}`)
        .then((res) => {
          this.list_location = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
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
            position: "top-right",
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
    DeleteLocation(id) {
      this.outerVisible = true;
      this.id_location = id;
    },
    Delete() {
      axios
        .delete(`/jobs/locations/${this.id_location}`)
        .then((res) => {
          var type = "is-success";
          if (res.data.status == 204) {
            type = "is-warning";
          }
          toast({
            message: res.data.msg,
            type: type,
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: "top-right",
          });
        })
        .catch((err) => {
          console.log(err);
        });
      this.outerVisible = false;
      this.id_location = 0;
    },
  },
};
</script>

<style lang="scss">
@import "../../../assets/css/index.css";
@import "index.css";
.search-container {
  display: flex;
}
.create-btn {
  margin: auto;
}
.create-btn button.ant-btn.ant-btn-primary {
  font-size: 30px;
  font-weight: 550;
  line-height: 20px;
  background: #007082;
  border-color: #007082;
  height: 35px;
  border-radius: 10px;
}
.search-input input.ant-input {
  width: 250px !important;
  height: 37px;
}
.search-container {
  margin: 20px 10px 10px 10px;
}
.add-location .list-location {
  margin: 10px;
  margin-right: 25px;
  text-align: left;
}
.add-location .item-location {
  display: flex;
  justify-content: space-between;
  padding: 5px 20px 5px 20px;
  border: 1px solid #e9e9e9;
  background: white;
  border-radius: 8px;
  font-weight: 550;
  margin: 0;
  box-shadow: 2px 4px 4px rgb(33 47 63 / 5%);
}
.add-location .item-location button.el-button.is-link {
  font-size: 16px;
}
.add-location .location-icon span {
  padding-left: 20px;
  font-size: 19px;
  color: #2c3e50;
}
.add-location .list-location h2 {
  font-size: 20px;
  font-family: Roboto, sans-serif;
  font-weight: 550;
  text-align: left;
  margin-top: 10px;
  line-height: 35px;
}
.add-location aside.el-aside.side {
  background: white;
}
.add-location .display-grid {
  display: grid;
  grid-template-columns: 0.8fr 1fr;
}
.add-location .display-grid label {
  text-align: right;
  margin: auto 30px;
  font-size: 17px !important;
  font-weight: 550;
}
.add-location .el-card.is-always-shadow {
  min-width: 600px;
  min-height: 500px;
  padding: 20px;
  padding-right: 100px;
  width: fit-content;
}
.form button.ant-btn.ant-btn-primary {
  font-size: 20px;
  font-weight: 550;
  height: fit-content;
  padding: 5px 30px;
  position: absolute;
  right: 0;
  background: #007082;
  border-color: #007082;
  border-radius: 8px;
}
form.ant-form.ant-form-horizontal {
  position: relative;
}
.card-location {
  margin: 70px auto;
}
</style>
