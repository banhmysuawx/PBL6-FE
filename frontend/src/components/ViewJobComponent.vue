<template>
  <el-main>
    <div class="button-add-job">
      <el-button type="primary" @click="dialogVisible = true"
        >Add New Job</el-button
      >
    </div>
    <div class="main-container">
      <div class="job-category">
        <el-card class="box-card">
          <template #header> </template>
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item name="1">
              <template #title>
                <div class="title"><b>DEV</b></div>
              </template>
              <div class="job-item">
                <el-row>
                  <el-col :span="8">Doctor</el-col>
                </el-row>
                <el-row>
                  <el-col :span="8"
                    ><el-icon color="red"><location /></el-icon> Ho Chi Minh
                    city</el-col
                  >
                  <el-col :span="8">10 candidates apply</el-col>
                  <el-col :span="8">
                    <el-button link
                      ><Edit
                        style="width: 1em; height: 1em; margin-left: 10px"
                        color="blue"
                    /></el-button>
                    <el-button link @click="outerVisible = true"
                      ><Delete
                        style="width: 1em; height: 1em; margin-left: 5px"
                        color="black"
                    /></el-button>
                  </el-col>
                </el-row>
              </div>
              <div class="job-item">
                <el-row>
                  <el-col :span="8">Doctor</el-col>
                </el-row>
                <el-row>
                  <el-col :span="8"
                    ><el-icon color="red"><location /></el-icon> Ho Chi Minh
                    city</el-col
                  >
                  <el-col :span="8">10 candidates apply</el-col>
                  <el-col :span="8">
                    <el-button link
                      ><Edit
                        style="width: 1em; height: 1em; margin-left: 10px"
                        color="blue"
                    /></el-button>
                    <el-button link @click="outerVisible = true"
                      ><Delete
                        style="width: 1em; height: 1em; margin-left: 5px"
                        color="black"
                    /></el-button>
                  </el-col>
                </el-row>
              </div>
              <div class="job-item">
                <el-row>
                  <el-col :span="8">Doctor</el-col>
                </el-row>
                <el-row>
                  <el-col :span="8"
                    ><el-icon color="red"><location /></el-icon> Da Nang
                    city</el-col
                  >
                  <el-col :span="8">10 candidates apply</el-col>
                  <el-col :span="8">
                    <el-button link
                      ><Edit
                        style="width: 1em; height: 1em; margin-left: 10px"
                        color="blue"
                    /></el-button>
                    <el-button link @click="outerVisible = true"
                      ><Delete
                        style="width: 1em; height: 1em; margin-left: 5px"
                        color="black"
                    /></el-button>
                  </el-col>
                </el-row>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </div>

      <div class="job-category">
        <el-card class="box-card">
          <template #header> </template>
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item name="1">
              <template #title>
                <div class="title"><b>DEV</b></div>
              </template>
              <div class="job-item">
                <el-row>
                  <el-col :span="8">Doctor</el-col>
                </el-row>
                <el-row>
                  <el-col :span="8"
                    ><el-icon color="red"><location /></el-icon> Ho Chi Minh
                    city</el-col
                  >
                  <el-col :span="8">10 candidates apply</el-col>
                  <el-col :span="8">
                    <el-button link
                      ><Edit
                        style="width: 1em; height: 1em; margin-left: 10px"
                        color="blue"
                    /></el-button>
                    <el-button link @click="outerVisible = true"
                      ><Delete
                        style="width: 1em; height: 1em; margin-left: 5px"
                        color="black"
                    /></el-button>
                  </el-col>
                </el-row>
              </div>
              <div class="job-item">
                <el-row>
                  <el-col :span="8">Doctor</el-col>
                </el-row>
                <el-row>
                  <el-col :span="8"
                    ><el-icon color="red"><location /></el-icon> Ho Chi Minh
                    city</el-col
                  >
                  <el-col :span="8">10 candidates apply</el-col>
                  <el-col :span="8">
                    <el-button link
                      ><Edit
                        style="width: 1em; height: 1em; margin-left: 10px"
                        color="blue"
                    /></el-button>
                    <el-button link @click="outerVisible = true"
                      ><Delete
                        style="width: 1em; height: 1em; margin-left: 5px"
                        color="black"
                    /></el-button>
                  </el-col>
                </el-row>
              </div>
              <div class="job-item">
                <el-row>
                  <el-col :span="8">Doctor</el-col>
                </el-row>
                <el-row>
                  <el-col :span="8"
                    ><el-icon color="red"><location /></el-icon> Da Nang
                    city</el-col
                  >
                  <el-col :span="8">10 candidates apply</el-col>
                  <el-col :span="8">
                    <el-button link
                      ><Edit
                        style="width: 1em; height: 1em; margin-left: 10px"
                        color="blue"
                    /></el-button>
                    <el-button link @click="outerVisible = true"
                      ><Delete
                        style="width: 1em; height: 1em; margin-left: 5px"
                        color="black"
                    /></el-button>
                  </el-col>
                </el-row>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </div>
    </div>
  </el-main>
</template>

<script>
export default {
  name: "ViewJobComponent",
};
</script>
