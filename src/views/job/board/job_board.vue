<template>
  <div>
    <el-container class="layout-container-demo">
      <SideBar />
      <el-container>
        <el-header style="height: 80px; background: #007082; padding: 0"
          ><HeaderCompanyView
        /></el-header>
        <el-container>
          <el-aside>
            <el-row class="row-aside" style="margin: 10px 0px">
              <el-input
                v-model="text_search_job"
                placeholder="Please input"
                class="input-with-select"
                @keyup="searchJob()"
                style="margin: 10px"
              >
                <template #prepend>
                  <el-icon color="blue"><Search /></el-icon>
                </template>
              </el-input>
            </el-row>
            <ul
              v-infinite-scroll="load"
              class="infinite-list infinite-list-scroll"
              style="height: 100%; cursor: pointer"
            >
              <li
                v-for="(item, index) in jobs_search"
                :key="item.id"
                class="infinite-list-item infinite-list-scroll-item"
                :class="{ active: isActive[index] }"
                @click="ShowApplicant(item, index)"
                style="height: 50px; border-radius: 10px"
              >
                <el-row style="margin: 5px 0px">{{ item.name }}</el-row>
              </li>
            </ul>
          </el-aside>
          <el-main>
            <div class="job-board-title">
              <h2>{{ job_current.name }}</h2>
            </div>
            <div class="job-board-header">
              <div class="job-board-header__text">
                <p>{{ job_current.number_applicants_search }} Candidates</p>
              </div>

              <el-row :gutter="20">
                <div class="filter-item">
                  <el-select
                    v-model="sort_by_value"
                    placeholder="Sort By"
                    @change="searchApplicant()"
                  >
                    <el-option
                      label="Day Applied"
                      value="apply_date"
                    ></el-option>
                    <el-option
                      label="Day Do Test"
                      value="status_do_test_date"
                    ></el-option>
                    <el-option
                      label="Day Interview"
                      value="status_interview_date"
                    ></el-option>
                  </el-select>
                </div>
                <div class="filter-item">
                  <el-input
                    v-model="text_search_applicant"
                    placeholder="Please input"
                    class="input-with-select"
                    @keyup="searchApplicant()"
                  >
                    <template #prepend>
                      <el-icon color="blue"><Search /></el-icon>
                    </template>
                  </el-input>
                </div>
                <div class="filter-item">
                  <el-select
                    v-model="status_filter_text"
                    placeholder="Filter"
                    @change="searchApplicant()"
                  >
                    <el-option label="All" value="all"></el-option>
                    <el-option label="Apply" value="apply"></el-option>
                    <el-option label="Do Test" value="test"></el-option>
                    <el-option
                      label="Set Schedule"
                      value="set_schedule"
                    ></el-option>
                    <el-option
                      label="Interview Pending"
                      value="interview_pending"
                    ></el-option>
                    <el-option
                      label="Scheduled Interview"
                      value="schedule_interview"
                    ></el-option>
                    <el-option
                      label="Cancel Interview"
                      value="cancel_interview"
                    ></el-option>
                    <el-option
                      label="Interview Complete"
                      value="interview_complete"
                    ></el-option>
                    <el-option label="Complete" value="complete"></el-option>
                    <el-option
                      label="Incomplete"
                      value="incomplete"
                    ></el-option>
                  </el-select>
                </div>
              </el-row>
            </div>
            <el-row
              class="el-row-class"
              v-for="applicant in applicants_search"
              :key="applicant.id"
            >
              <el-col :span="8" class="demo-avatar demo-basic el-col-avatar">
                <div class="demo-basic--circle">
                  <div class="block" style="margin-top: 25px">
                    <el-avatar :size="100" :src="circleUrl" />
                  </div>
                </div>
                <div class="block el-col-sub-item">
                  <div class="el-col-item btn">
                    <el-button type="success" v-if="applicant.status == 'apply'"
                      >Apply</el-button
                    >
                    <el-button type="info" plain v-else>Apply</el-button>
                  </div>
                  <div class="el-col-item name">
                    {{ applicant.candidate_name }}
                  </div>
                  <div class="el-col-item">
                    Apply on: {{ applicant.apply_format_day }}
                  </div>
                  <div style="margin: 5px 10px">
                    <el-button
                      type="primary"
                      plain
                      @click="showDetailCandidate(applicant)"
                      >Detail</el-button
                    >
                  </div>
                </div>
              </el-col>
              <el-col :span="5" class="el-col-sub-item">
                <div class="el-col-item btn">
                  <el-button type="success" v-if="applicant.status == 'test'"
                    >Do Test</el-button
                  >
                  <el-button plain type="info" v-else>Do Test</el-button>
                </div>
                <span v-if="applicant.status_do_test_date != null">
                  <div
                    class="el-col-item status"
                    v-if="applicant.result_test == 0"
                  >
                    <el-tag>{{ applicant.test_format_day }}</el-tag
                    ><el-tag>{{ applicant.expired_format_day }}</el-tag>
                  </div>
                  <el-row v-else></el-row>

                  <div class="el-col-item">
                    <el-progress
                      :text-inside="true"
                      :stroke-width="20"
                      :percentage="applicant.result_test"
                      style="width: 150px"
                    />
                  </div>
                </span>
              </el-col>
              <el-col :span="7" class="el-col-sub-item">
                <div class="el-col-item btn">
                  <el-button
                    plain
                    type="info"
                    v-if="
                      applicant.status == 'apply' ||
                      applicant.status == 'test' ||
                      applicant.status == 'complete' ||
                      applicant.status == 'incomplete'
                    "
                    >Interview</el-button
                  >
                  <el-button type="success" v-else>Interview</el-button>
                </div>

                <span v-if="applicant.status == 'set_schedule'">
                  <a-tag class="status-tag" color="purple"
                    >Send Interview Schedule</a-tag
                  >
                  <el-row></el-row>
                  <el-button
                    type="primary"
                    style="margin-left: 16px"
                    @click="SetSchedule(applicant)"
                  >
                    Set Schedule
                  </el-button>
                </span>

                <span v-if="applicant.status == 'interview_pending'">
                  <a-tag class="status-tag" color="orange"
                    >Interview Pending</a-tag
                  >
                  <el-row></el-row>
                  <el-button
                    type="primary"
                    plain
                    style="margin-left: 16px"
                    @click="ShowSchedule(applicant)"
                  >
                    Show Schedule
                  </el-button>
                </span>

                <span v-if="applicant.status == 'schedule_interview'">
                  <a-tag class="status-tag" color="blue"
                    >Schedule Interview</a-tag
                  ><br />
                  <el-tag
                    v-if="applicant.interview_date_official_format != null"
                    >{{ applicant.interview_date_official_format }}</el-tag
                  >
                  <el-row
                    style="margin-top: 10px"
                    v-if="applicant.is_send_email == false"
                  >
                    <el-col :span="6"></el-col>
                    <el-col :span="12"
                      ><el-button
                        type="primary"
                        plain
                        @click="sendMail(applicant)"
                        >Send Email</el-button
                      ></el-col
                    >
                    <el-col :span="6"></el-col>
                  </el-row>
                </span>

                <span v-if="applicant.status == 'cancel_interview'">
                  <a-tag class="status-tag" color="red">Cancel Interview</a-tag>
                </span>

                <span v-if="applicant.status == 'interview_complete'">
                  <a-tag class="status-tag" color="green"
                    >Interview complete</a-tag
                  >
                  <el-row></el-row>
                  <el-row>
                    <el-col :span="12"
                      ><el-button
                        type="danger"
                        @click="ChangeInComplete(applicant)"
                        >Fail</el-button
                      ></el-col
                    >
                    <el-col :span="12"
                      ><el-button
                        type="success"
                        @click="ChangeComplete(applicant)"
                        >Pass</el-button
                      ></el-col
                    >
                  </el-row>
                </span>
              </el-col>

              <el-col :span="3" style="background: white; margin: 0px 2px">
                <div class="el-col-item btn">
                  <el-button
                    type="success"
                    v-if="
                      applicant.status == 'complete' ||
                      applicant.status == 'incomplete'
                    "
                    >Result</el-button
                  >
                  <el-button type="info" v-else plain>Result</el-button>
                </div>
                <el-result icon="success" v-if="applicant.status == 'complete'">
                </el-result>
                <el-result
                  icon="error"
                  v-else-if="applicant.status == 'incomplete'"
                >
                </el-result>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
      </el-container>
    </el-container>

    <!--Detail Candidate-->
    <el-drawer v-model="drawerDetailCandidate" :direction="direction">
      <template #title>
        <h4>Candidate Information</h4>
      </template>
      <template #default>
        <div>
          <div class="demo-basic--circle">
            <div class="block" style="margin-top: 25px">
              <el-avatar :size="50" :src="circleUrl" />
            </div>
          </div>
          <div class="candidate-name">
            {{ applicant_choice.candidate_name }}
          </div>
          <a :href="applicant_choice.cv">CV: {{ applicant_choice.cv }}</a>
        </div>

        <div style="margin: 20px 0px">
          <el-row
            ><div
              style="float: left; margin: 5px; font-size: 20px"
              class="profile-item__title"
            >
              Job Expirences
            </div></el-row
          >
          <el-row>
            <div>
              <el-timeline>
                <el-timeline-item
                  v-for="expirence in expirences"
                  :key="expirence.id"
                  type="primary"
                  size="large"
                  hollow="true"
                  :timestamp="expirence.start_date"
                >
                  {{ expirence.job_title }}
                </el-timeline-item>
              </el-timeline>
            </div>
          </el-row>
        </div>

        <div style="margin: 20px 0px">
          <el-row
            ><div
              style="float: left; margin: 5px; font-size: 20px"
              class="profile-item__title"
            >
              Skills
            </div></el-row
          >
          <el-row>
            <div>
              <el-timeline>
                <el-timeline-item
                  v-for="skill in skills"
                  :key="index"
                  type="primary"
                  size="large"
                  hollow="true"
                  :timestamp="skill.skill_level"
                >
                  {{ skill.skill_name }}
                </el-timeline-item>
              </el-timeline>
            </div>
          </el-row>
        </div>

        <div style="margin: 20px 0px">
          <el-row
            ><div
              style="float: left; margin: 5px; font-size: 20px"
              class="profile-item__title"
            >
              Education & Achievement
            </div></el-row
          >
          <el-row>
            <div>
              <el-timeline>
                <el-timeline-item
                  v-for="education in educations"
                  :key="index"
                  type="primary"
                  size="large"
                  hollow="true"
                  :timestamp="education.completion_date"
                >
                  {{ education.certificate_degree_name }}
                  <span v-if="education.gpa > 0">
                    - gpa : {{ education.gpa }}</span
                  >
                </el-timeline-item>
              </el-timeline>
            </div>
          </el-row>
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawerDetailCandidate = false">Cancel</el-button>
          <el-button
            type="danger"
            @click="confirmFail = true"
            v-if="applicant_choice.status == 'apply'"
            >Fail</el-button
          >
          <el-button
            type="primary"
            @click="confirmPass = true"
            v-if="applicant_choice.status == 'apply'"
            >Pass</el-button
          >
        </div>
      </template>
    </el-drawer>

    <!-- Dialog confirm mark fail candidate-->
    <el-dialog
      v-model="confirmFail"
      title="Tips"
      width="30%"
      :before-close="handleClose"
    >
      <span>Do you mark fail candidate? </span>
      <template #footer>
        <el-button @click="confirmFail = false">Cancel</el-button>
        <el-button type="primary" @click="ChangeFail()"> OK </el-button>
      </template>
    </el-dialog>

    <!-- Dialog confirm mark pass candidate-->
    <el-dialog
      v-model="confirmPass"
      title="Tips"
      width="30%"
      :before-close="handleClose"
    >
      <span>Do you mark pass candidate? </span>
      <template #footer>
        <el-button @click="confirmFail = false">Cancel</el-button>
        <el-button type="primary" @click="ChangePass()"> OK </el-button>
      </template>
    </el-dialog>

    <!--Drawer for set schedule-->
    <el-drawer v-model="isSetSchedule" title="Schedule To Interview" size="40%">
      <el-row>
        <el-col :span="8">
          <div class="demo-basic--circle">
            <div class="block" style="margin-top: 25px">
              <el-avatar :size="75" :src="circleUrl" />
            </div>
          </div>
          <div class="candidate-name">Ngo Nguyen Hoang Dung</div>
        </el-col>
        <el-col :span="16">
          <span class="demonstration">Set Schedule: </span>
          <el-select
            v-model="applicant_interview.value_choice_set_schedule"
            class="m-2"
            placeholder="Select"
            size="large"
            @change="ChangeChoice()"
          >
            <el-option
              v-for="item in choice_set_schedule"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
          <!-- <div class="demo-date-picker"> -->
          <span class="demonstration">Limited Day:</span>
          <el-date-picker
            v-model="applicant_interview.end_set_schedule_interview"
            type="date"
            placeholder="Pick a day"
            size="default"
            value-format="YYYY-MM-DD"
            style="cursor: pointer"
          />
          <!-- </div> -->
        </el-col>
      </el-row>

      <div>
        <div class="bar-update" style="padding: 10px">
          <el-button @click="showPeriodSchedule()"
            >Watch period availabel period</el-button
          >
          <el-button type="primary" @click="isMyCalendar = true"
            >My Calendar</el-button
          >
          <div style="margin-bottom: 10px" class="btn-update">
            <el-button
              type="danger"
              @click="UpdateApplicantInterview()"
              v-if="applicant_choice.status == 'interview_pending'"
              >Update</el-button
            >
            <el-button type="primary" @click="CreateApplicantInterview()" v-else
              >Save</el-button
            >
          </div>
        </div>
        <span v-for="(item, index) in list_period_to_schedule" :key="index">
          <el-row v-if="index % 2 == 0">
            <el-col :span="12">
              <el-card class="box-card" style="width: 270px">
                <template #header>
                  <div class="card-header">
                    <span>{{ list_period_to_schedule[index].day }}</span>
                  </div>
                </template>
                <div
                  v-for="(period, index1) in list_period_to_schedule[index]
                    .available"
                  :key="index1"
                  class="text item"
                >
                  <span v-if="index1 % 2 == 0">
                    <el-row
                      v-if="
                        applicant_interview.value_choice_set_schedule ==
                        'manual'
                      "
                    >
                      <el-col :span="12">
                        <el-checkbox
                          v-model="check_period_to_schedule[index][index1]"
                          border
                          size="small"
                          @change="ChoicePeriod(index, index1)"
                        >
                          {{
                            list_period_to_schedule[index].available[index1]
                              .start
                          }}
                          -
                          {{
                            list_period_to_schedule[index].available[index1].end
                          }}
                        </el-checkbox>
                      </el-col>
                      <el-col
                        :span="12"
                        v-if="
                          index1 + 1 <
                          list_period_to_schedule[index].available.length
                        "
                      >
                        <el-checkbox
                          size="small"
                          v-model="check_period_to_schedule[index][index1 + 1]"
                          border
                          @change="ChoicePeriod(index, index1 + 1)"
                        >
                          {{
                            list_period_to_schedule[index].available[index1 + 1]
                              .start
                          }}
                          -
                          {{
                            list_period_to_schedule[index].available[index1 + 1]
                              .end
                          }}
                        </el-checkbox></el-col
                      >
                    </el-row>
                    <el-row v-else>
                      <el-col :span="12"
                        ><el-checkbox-button
                          >{{
                            list_period_to_schedule[index].available[index1]
                              .start
                          }}
                          -
                          {{
                            list_period_to_schedule[index].available[index1].end
                          }}</el-checkbox-button
                        ></el-col
                      >
                      <el-col
                        :span="12"
                        v-if="
                          index1 + 1 <
                          list_period_to_schedule[index].available.length
                        "
                        ><el-checkbox-button
                          >{{
                            list_period_to_schedule[index].available[index1 + 1]
                              .start
                          }}
                          -
                          {{
                            list_period_to_schedule[index].available[index1 + 1]
                              .end
                          }}</el-checkbox-button
                        ></el-col
                      >
                    </el-row>
                  </span>
                </div>
              </el-card>
            </el-col>

            <el-col
              :span="12"
              v-if="index + 1 < list_period_to_schedule.length"
            >
              <el-card class="box-card" style="width: 270px">
                <template #header>
                  <div class="card-header">
                    <span>{{ list_period_to_schedule[index + 1].day }}</span>
                  </div>
                </template>
                <div
                  v-for="(period, index2) in list_period_to_schedule[index + 1]
                    .available"
                  :key="index2"
                  class="text item"
                >
                  <span v-if="index2 % 2 == 0">
                    <el-row
                      v-if="
                        applicant_interview.value_choice_set_schedule ==
                        'manual'
                      "
                    >
                      <el-col :span="12">
                        <el-checkbox
                          size="small"
                          v-model="check_period_to_schedule[index + 1][index2]"
                          border
                          @change="ChoicePeriod(index + 1, index2)"
                        >
                          {{
                            list_period_to_schedule[index + 1].available[index2]
                              .start
                          }}
                          -
                          {{
                            list_period_to_schedule[index + 1].available[index2]
                              .end
                          }}
                        </el-checkbox>
                      </el-col>
                      <el-col
                        :span="12"
                        v-if="
                          index2 + 1 <
                          list_period_to_schedule[index + 1].available.length
                        "
                      >
                        <el-checkbox
                          size="small"
                          v-model="
                            check_period_to_schedule[index + 1][index2 + 1]
                          "
                          @change="ChoicePeriod(index + 1, index2 + 1)"
                          border
                        >
                          {{
                            list_period_to_schedule[index + 1].available[
                              index2 + 1
                            ].start
                          }}
                          -
                          {{
                            list_period_to_schedule[index + 1].available[
                              index2 + 1
                            ].end
                          }}
                        </el-checkbox>
                      </el-col>
                    </el-row>
                    <el-row v-else>
                      <el-col :span="12"
                        ><el-checkbox-button
                          >{{
                            list_period_to_schedule[index + 1].available[index2]
                              .start
                          }}
                          -
                          {{
                            list_period_to_schedule[index + 1].available[index2]
                              .end
                          }}</el-checkbox-button
                        ></el-col
                      >
                      <el-col
                        :span="12"
                        v-if="
                          index2 + 1 <
                          list_period_to_schedule[index + 1].available.length
                        "
                        ><el-checkbox-button
                          >{{
                            list_period_to_schedule[index + 1].available[
                              index2 + 1
                            ].start
                          }}
                          -
                          {{
                            list_period_to_schedule[index + 1].available[
                              index2 + 1
                            ].end
                          }}</el-checkbox-button
                        ></el-col
                      >
                    </el-row>
                  </span>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </span>
      </div>
    </el-drawer>
    <!--Send Email-->
    <el-dialog
      v-model="dialogSendMail"
      title="Information Send Mail"
      style="width: fit-content"
    >
      <el-form>
        <el-form-item>
          <a href="https://meet.google.com/" target="_blank"
            >Please create new meeting and get link</a
          >
        </el-form-item>

        <el-form-item label="Link">
          <el-input
            autocomplete="off"
            placeholder="Please input link google meet"
            v-model="link"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogSendMail = false">Cancel</el-button>
          <el-button type="primary" @click="sendEmail()"> Confirm </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import SideBar from "@/components/SideBar.vue";
import HeaderCompanyView from "@/components/HeaderCompany.vue";
import axios from "axios";
import "@fullcalendar/core/vdom";
import { toast } from "bulma-toast";
export default {
  name: "JobBoard",
  data() {
    return {
      drawerDetailCandidate: false,
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      jobs: [],
      link: "",
      dialogSendMail: false,
      text_search_job: "",
      jobs_search: [],
      applicants: [],
      skills: [],
      educations: [],
      expirences: [],
      applicant_choice: "",
      confirmFail: false,
      confirmPass: false,
      id_job_current: 0,
      job_current: {},
      isActive: [],
      text_search_applicant: "",
      sort_by_value: "apply_date",
      status_filter_text: "all",
      applicants_search: [],
      data_filter: {
        name: "",
        apply_on: "",
        limit_apply_on: 1,
        result_test: 0,
        limit_result_test: 1,
        result: 1,
      },
      isSetSchedule: false,
      isMyCalendar: false,
      choice_set_schedule: ["automate", "manual"],
      applicant_interview: {
        id: 0,
        value_choice_set_schedule: "",
        end_set_schedule_interview: "",
      },
      list_period_to_schedule: [],
      check_period_to_schedule: [],
      period_to_schedule_choices: [],
    };
  },
  async created() {
    const id = this.$store.state.company.id;
    await axios
      .get(`/applicants/company/outdated_do_test?company_id=${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .get(`/jobs/company/get_jobs?company_id=${id}`)
      .then((response) => {
        this.jobs = response.data;
        this.jobs_search = this.jobs;
      })
      .catch((err) => {
        console.log(err);
      });

    for (var i = 0; i < this.jobs_search.length; i++) {
      this.isActive[i] = false;
    }
    const id_company = this.$store.state.company.id;
    await axios
      .get(
        `/applicants/company/get_all_applicants?company_id=${id_company}&page=1`
      )
      .then((response) => {
        this.applicants = response.data;
        this.processPercentageForResult();
        this.applicants_search = this.applicants;
        this.job_current["number_applicants"] = this.applicants.length;
        this.job_current["number_applicants_search"] = this.applicants.length;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  components: {
    SideBar,
    HeaderCompanyView,
  },

  methods: {
    processPercentageForResult() {
      for (var i = 0; i < this.applicants.length; i++) {
        this.applicants[i].result_test *= 100;
      }
    },

    initialData() {
      (this.applicant_interview = {
        value_choice_set_schedule: "",
        end_set_schedule_interview: "",
      }),
        (this.list_period_to_schedule = []);
      this.check_period_to_schedule = [];
      this.period_to_schedule_choices = [];
      console.log("aloooo");
      console.log(this.applicant_interview);
    },

    blurLocation() {
      console.log("hello");
    },
    async searchJob() {
      this.jobs_search = this.jobs.filter((item) =>
        item.name.toLowerCase().includes(this.text_search_job.toLowerCase())
      );
    },

    async searchApplicant() {
      const id_company = this.$store.state.company.id;
      const id_job = this.id_job_current;
      axios
        .get(
          `/applicants/company/filter_applicants?company_id=${id_company}&job_id=${id_job}&text=${this.text_search_applicant}&status=${this.status_filter_text}&sort_by=${this.sort_by_value}`
        )
        .then((response) => {
          this.applicants = response.data;
          console.log("hiiii");
          console.log(this.applicants);
          this.processPercentageForResult();
          this.applicants_search = this.applicants;
          this.job_current["number_applicants"] = this.applicants.length;
          this.job_current["number_applicants_search"] = this.applicants.length;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async ShowApplicant(item, index) {
      for (var i = 0; i < this.jobs_search.length; i++) {
        this.isActive[i] = false;
      }
      this.isActive[index] = true;

      this.id_job_current = item.id;
      this.job_current = item;
      await axios
        .get(`/applicants/company/get_applicant?id_job=${item.id}`)
        .then((response) => {
          this.applicants = response.data;
          this.processPercentageForResult();
          this.applicants_search = this.applicants;
          this.job_current["number_applicants"] = this.applicants.length;
          this.job_current["number_applicants_search"] = this.applicants.length;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async showDetailCandidate(applicant) {
      this.applicant_choice = applicant;
      console.log("applicant choice");
      console.log(this.applicant_choice);
      await axios
        .get(`/seekers/profile-education?seeker_id=${applicant.seeker_id}`)
        .then((response) => {
          this.educations = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .get(`/seekers/profile-expirence?seeker_id=${applicant.seeker_id}`)
        .then((response) => {
          this.expirences = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .get(`/seekers/profile-skill?seeker_id=${applicant.seeker_id}`)
        .then((response) => {
          this.skills = response.data;
        })
        .catch((err) => {
          console.log(err);
        });

      this.drawerDetailCandidate = true;
    },

    async ChangeFail() {
      const form = {
        status: "incomplete",
      };
      await axios
        .patch(`/applicants/applicant/${this.applicant_choice.id}`, form)
        .then((response) => {})
        .catch((err) => {});
      await axios
        .get(`/applicants/company/get_applicant?id_job=${this.id_job_current}`)
        .then((response) => {
          this.applicants = response.data;
          this.processPercentageForResult();
          this.applicants_search = this.applicants;
          this.confirmFail = false;
          this.drawerDetailCandidate = false;
          toast({
            message: "Mark Fail successful",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: "top-right",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async ChangePass() {
      const form = {
        status: "test",
      };
      await axios
        .patch(`/applicants/applicant/${this.applicant_choice.id}`, form)
        .then((response) => {})
        .catch((err) => {});
      await axios
        .get(`/applicants/company/get_applicant?id_job=${this.id_job_current}`)
        .then((response) => {
          this.applicants = response.data;
          this.processPercentageForResult();
          this.applicants_search = this.applicants;
          this.confirmPass = false;
          this.drawerDetailCandidate = false;
          toast({
            message: "Mark Pass successful",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: "top-right",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    showPeriodSchedule() {
      console.log(this.applicant_interview);
      axios
        .get(
          `/applicants/company/applicant-interview/get_time?id_applicant=${this.applicant_choice.id}&limited_day=${this.applicant_interview.end_set_schedule_interview}&choice=${this.applicant_interview.value_choice_set_schedule}`
        )
        .then((response) => {
          this.list_period_to_schedule = response.data;

          for (var i = 0; i < this.list_period_to_schedule.length; i++) {
            var check = [];
            for (
              var k = 0;
              k < this.list_period_to_schedule[i].available.length;
              k++
            ) {
              check[k] = 0;
            }
            this.check_period_to_schedule[i] = check;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    SetSchedule(applicant) {
      this.initialData();
      this.isSetSchedule = true;
      this.applicant_choice = applicant;
    },

    async CreateApplicantInterview() {
      var data = {};
      if (this.applicant_interview.value_choice_set_schedule == "automate") {
        data = {
          applicant: this.applicant_choice.id,
          choice_set_schedule_interview:
            this.applicant_interview.value_choice_set_schedule,
          end_set_schedule_interview:
            this.applicant_interview.end_set_schedule_interview,
        };
      } else {
        data = {
          applicant: this.applicant_choice.id,
          choice_set_schedule_interview:
            this.applicant_interview.value_choice_set_schedule,
          end_set_schedule_interview:
            this.applicant_interview.end_set_schedule_interview,
          period_time_choice: this.period_to_schedule_choices,
        };
      }
      await axios
        .post("/applicants/applicant-interview", data)
        .then((response) => {
          console.log(response.data);
          toast({
            message: "Create Interview Schedule Success",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: "top-right",
          });
          this.isSetSchedule = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    ChoicePeriod(index_parent, index_child) {
      console.log("choices");
      if (this.check_period_to_schedule[index_parent][index_child]) {
        const item = {
          day: this.list_period_to_schedule[index_parent].day,
          start_time:
            this.list_period_to_schedule[index_parent].available[index_child]
              .start,
          end_time:
            this.list_period_to_schedule[index_parent].available[index_child]
              .end,
        };
        this.period_to_schedule_choices.push(item);
      } else {
        var index_find = -1;
        for (
          var index = 0;
          index < this.period_to_schedule_choices.length;
          index++
        ) {
          if (
            this.list_period_to_schedule[index_parent].day ==
              this.period_to_schedule_choices[index].day &&
            this.list_period_to_schedule[index_parent].available[index_child]
              .start == this.period_to_schedule_choices[index].start_time &&
            this.list_period_to_schedule[index_parent].available[index_child]
              .end == this.period_to_schedule_choices[index].end_time
          ) {
            index_find = index;
            break;
          }
        }
        if (index_find != -1) {
          this.period_to_schedule_choices.splice(index_find, 1);
        }
      }
    },

    async ShowSchedule(applicant) {
      this.initialData();
      this.applicant_choice = applicant;
      await axios
        .get(
          `/applicants/company/applicant-interview/get_applicant_interview_by_applicant?id_applicant=${applicant.id}`
        )
        .then((response) => {
          this.applicant_interview.value_choice_set_schedule =
            response.data.choice_set_schedule_interview;
          this.applicant_interview.end_set_schedule_interview =
            response.data.end_set_schedule_interview;
          this.applicant_interview.id = response.data.id;
        })
        .catch((err) => {
          console.log(err);
        });

      if (this.applicant_interview.value_choice_set_schedule == "automate") {
        await axios
          .get(
            `/applicants/company/applicant-interview/get_time?id_applicant=${this.applicant_choice.id}&limited_day=${this.applicant_interview.end_set_schedule_interview}&choice=${this.applicant_interview.value_choice_set_schedule}`
          )
          .then((response) => {
            this.list_period_to_schedule = response.data;
            this.isSetSchedule = true;
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (
        this.applicant_interview.value_choice_set_schedule == "manual"
      ) {
        await axios
          .get(
            `/applicants/company/period-interview/get_period_by_interview_manual?id_applicant_interview=${this.applicant_interview.id}`
          )
          .then((response) => {
            this.list_period_to_schedule = response.data;
            for (var i = 0; i < this.list_period_to_schedule.length; i++) {
              var check = [];
              for (
                var k = 0;
                k < this.list_period_to_schedule[i].available.length;
                k++
              ) {
                check[k] = true;
              }
              this.check_period_to_schedule[i] = check;
            }
            this.isSetSchedule = true;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    async UpdateApplicantInterview() {
      var data = {};
      if (this.applicant_interview.value_choice_set_schedule == "automate") {
        data = {
          choice_set_schedule_interview:
            this.applicant_interview.value_choice_set_schedule,
          end_set_schedule_interview:
            this.applicant_interview.end_set_schedule_interview,
        };
      } else {
        data = {
          choice_set_schedule_interview:
            this.applicant_interview.value_choice_set_schedule,
          end_set_schedule_interview:
            this.applicant_interview.end_set_schedule_interview,
          period_time_choice: this.period_to_schedule_choices,
        };
      }

      await axios
        .patch(
          `/applicants/applicant-interview/${this.applicant_interview.id}`,
          data
        )
        .then((response) => {
          console.log("update nhe");
          console.log(response.data);
          toast({
            message: "Update Interview Schedule Success",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: "top-right",
          });
          this.isSetSchedule = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    ChangeChoice() {
      console.log("change choice");
      console.log(this.applicant_interview.value_choice_set_schedule);
      if (
        this.list_period_to_schedule.length > 0 &&
        this.applicant_interview.value_choice_set_schedule == "manual"
      ) {
        for (var i = 0; i < this.list_period_to_schedule.length; i++) {
          var check = [];
          for (
            var k = 0;
            k < this.list_period_to_schedule[i].available.length;
            k++
          ) {
            check[k] = false;
          }
          this.check_period_to_schedule[i] = check;
        }
      }
    },
    sendMail(applicant) {
      this.dialogSendMail = true;
      this.applicant_choice = applicant;
    },
    sendEmail() {
      const data = {
        link: this.link,
      };
      axios
        .patch(
          `/applicants/company/${this.applicant_choice.id}/send_email_schedule`,
          data
        )
        .then((res) => {
          toast({
            message: res.data.msg,
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: "top-right",
          });
        })
        .catch((err) => {
          console.log(err);
        });
      this.dialogSendMail = false;
    },
    async ChangeInComplete(applicant) {
      const form = {
        status: "incomplete",
      };
      await axios
        .patch(`/applicants/applicant/${applicant.id}`, form)
        .then((response) => {})
        .catch((err) => {});
      await axios
        .get(`/applicants/company/get_applicant?id_job=${this.id_job_current}`)
        .then((response) => {
          this.applicants = response.data;
          this.processPercentageForResult();
          this.applicants_search = this.applicants;
          toast({
            message: "Mark Fail successful",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: "top-right",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async ChangeComplete(applicant) {
      const form = {
        status: "complete",
      };
      await axios
        .patch(`/applicants/applicant/${applicant.id}`, form)
        .then((response) => {})
        .catch((err) => {});
      await axios
        .get(`/applicants/company/get_applicant?id_job=${this.id_job_current}`)
        .then((response) => {
          this.applicants = response.data;
          this.processPercentageForResult();
          this.applicants_search = this.applicants;
          toast({
            message: "Mark Pass successful",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: "top-right",
          });
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
@import "./index.scss";
.job-board-header {
  display: flex;
  justify-content: space-between;
  margin: 10px 30px;
}
.filter-item {
  padding: 0 10px;
  width: 210px;
}
.job-board-header__text {
  font-size: 17px;
  font-style: italic;
}
.job-board-title h2 {
  font-weight: 550;
  font-size: 25px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  text-align: left;
  margin-top: 30px;
  margin-bottom: 1rem;
  margin-left: 20px;
  line-height: 35px;
  color: #888686;
}
.row-aside .el-input.el-input-group.el-input-group--prepend.input-with-select,
.filter-item .el-input.el-input-group.el-input-group--prepend.input-with-select,
.filter-item .el-input__wrapper {
  border-radius: 8px;
}
.filter-item input.el-input__inner,
.filter-item .el-select .el-input__inner {
  height: 35px;
  font-size: 15px;
}
.el-row-class .el-col.el-col-8.demo-avatar.demo-basic.el-col-avatar {
  padding: 15px;
  border-right: 4px solid #e9e9e9;
  border-radius: 8px;
}
.el-col-item.btn {
  text-align: center;
}
.el-col-item {
  text-align: left;
}
.el-col-item.name {
  font-size: 17px;
  font-weight: 550;
}
.el-col.el-col-5.el-col-sub-item,
.el-col.el-col-7.el-col-sub-item,
.el-col.el-col-3 {
  padding: 15px;
}
.el-col.el-col-5.el-col-sub-item,
.el-col.el-col-7.el-col-sub-item {
  border-right: 4px solid #e9e9e9;
}
.el-col.el-col-3 {
  border-radius: 8px;
}
.status-tag {
  margin: 10px !important;
  font-size: 14px !important;
  padding: 5px 20px !important;
  padding-bottom: 0 !important;
  border-radius: 7px !important;
  text-align: center;
}
.span.el-tag.el-tag--light {
  margin: 10px;
  font-size: 13px;
}
.el-row.el-row-class {
  background: white;
  margin-right: 10px;
  border-radius: 8px;
  box-shadow: 2px 2px 4px 4px rgb(0 0 0 / 5%);
}
.el-col-item.status {
  display: flex;
  margin: auto;
  justify-content: space-between;
  padding: 10px 0;
}
.el-row {
  margin-bottom: 10px;
}
.el-result {
  padding: 20px;
}
.infinite-list-scroll .infinite-list-scroll-item {
  box-shadow: 0;
}
li.infinite-list-item.infinite-list-scroll-item {
  color: rgb(48, 65, 86);
}
.infinite-list-scroll .active {
  box-shadow: 0px 5px 5px rgb(144 150 157);
  color: rgb(144, 150, 157) !important;
  border: 1px solid rgb(144, 150, 157);
}
.profile-item__title {
  font-size: 21px;
  font-weight: 550;
  color: #2c3e50;
}
.candidate-name {
  font-size: 22px;
  font-weight: 550;
  color: #2c3e50;
}
// .set-schedule {
//   display: flex;
// }
.el-col.el-col-16 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: auto;
}
span.demonstration {
  margin: auto;
}
.el-select.el-select--large.m-2 {
  margin: 0 !important;
}
.el-input.el-input--large.el-input--suffix {
  margin-bottom: 15px;
}
.bar-update {
  display: flex;
  margin: 50px;
  justify-content: space-between;
}
.btn-update {
  margin-left: 10px;
}
.candidate-name {
  font-size: 17px;
  font-weight: 550;
  color: #2c3e50;
}
main.el-main {
  overflow-y: scroll;
  height: 700px;
}
</style>
