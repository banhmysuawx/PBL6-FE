<template>
  <div class="home">
    <a-layout>
      <Header />
      <a-layout-content>
        <div class="container">
          <div class="company-detail">
            <div class="company-detail-content">
              <div class="company-introduce">
                <div class="company-introduce__logo">
                  <div class="company-introduce__logo__img">
                    <img v-bind:src="company_detail.image" alt="" />
                  </div>
                </div>
                <div class="company-introduce__info">
                  <h1 class="company-introduce__info__name">
                    {{ company_detail.company_name }}
                  </h1>
                  <div class="company-introduce__info__item">
                    <div class="info-item">
                      <WifiOutlined />
                      <div class="info-item__text">
                        {{ company_detail.company_location }}
                      </div>
                    </div>

                    <div class="info-item">
                      <MailFilled />
                      <div class="info-item__text">
                        {{ company_detail.established_date }}
                      </div>
                    </div>
                    <div class="info-item">
                      <PhoneFilled />
                      <div class="info-item__text">0935125585</div>
                    </div>
                  </div>
                </div>
                <div class="company-introduce__actions">
                  <a-button class="actions-btn">Write review</a-button>
                </div>
              </div>
              <div class="nav">
                <a-tabs>
                  <a-tab-pane class="nav-item" key="1" tab="Description">
                    <div class="company-detail-wrapper">
                      <div class="company-detail-box">
                        <div class="company-description">
                          <h2>
                            Overview about {{ company_detail.company_name }}
                          </h2>
                          <div class="company-description__text">
                            "{{ company_detail.profile_description }}"
                          </div>
                          <h2>Our Skill</h2>
                          <div class="tag">
                            <p>Java</p>
                            <p>English</p>
                            <p>Python</p>
                          </div>
                        </div>
                        <div class="job-opportunities">
                          <Job v-for="job in listJobs" v-bind:job="job" />
                        </div>
                      </div>
                      <div class="review-box">
                        <div class="review-box__content">
                          <div class="review-box__content__rating">
                            <h2>Rating</h2>
                            <div class="rating">
                              <a-rate
                                v-bind:value="company_detail.average_rating"
                                disabled
                                allow-half
                              />
                              {{ company_detail.average_rating }}
                            </div>
                          </div>
                          <div class="review-box__content__review">
                            <h2>Top Reviews</h2>
                            <div class="top-review">
                              <div
                                class="top-review__item"
                                v-for="review in listComments.slice(0, 3)"
                              >
                                <!-- <h3>Môi trường làm việc tốt cho Fresher</h3> -->
                                <div class="author">
                                  <a-avatar
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                  />
                                  <div class="author-info">
                                    <p>{{ review.author }}</p>
                                    <p class="created-at">
                                      {{
                                        review.created_at.replace(/\.\d+/, "")
                                      }}
                                    </p>
                                  </div>
                                </div>
                                <!-- <div class="created-at">
                                  {{ review.created_at.replace(/\.\d+/, "") }}
                                </div> -->
                                <div class="rating">
                                  <a-rate
                                    v-bind:value="review.rating"
                                    disabled
                                    allow-half
                                  />
                                  {{ review.rating }}
                                </div>
                                <p>
                                  {{ review.comment }}
                                </p>
                              </div>
                            </div>
                            <div class="top-review__action">
                              <a href="#" class="view-all">View all</a>
                              <a-button class="actions-btn"
                                >Write review</a-button
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a-tab-pane>
                  <a-tab-pane class="nav-item" key="2" tab="Review" force-render
                    ><div class="company-detail-wrapper">
                      <div class="company-detail-box">
                        <div class="company-description">
                          <h2>
                            {{ company_detail.reviews?.length }} Reviews about
                            {{ company_detail.company_name }}
                          </h2>
                          <div class="rating">
                            <a-rate
                              v-bind:value="company_detail.average_rating"
                              disabled
                              allow-half
                            />
                            {{ company_detail.average_rating }}
                          </div>
                        </div>
                        <div class="job-opportunities">
                          <div class="review-box__content__review">
                            <div class="write-review">
                              <div class="author">
                                <a-avatar
                                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                />
                              </div>
                              <a-form class="form-write-review">
                                <a-rate v-model:value="comment.rating" />
                                <a-form-item name="email">
                                  <a-textarea
                                    placeholder="Write your comment..."
                                    auto-size
                                    v-model:value="comment.comment"
                                  />
                                  <a-button
                                    class="send-icon"
                                    @click="createComment"
                                  >
                                    <span><SendOutlined /></span>
                                  </a-button>
                                </a-form-item>
                              </a-form>
                            </div>
                            <div class="top-review">
                              <div
                                class="top-review__item"
                                v-for="(review, index) in listComments"
                              >
                                <!-- <h3>Môi trường làm việc tốt cho Fresher</h3> -->
                                <div class="author">
                                  <div class="author-info-left">
                                    <a-avatar
                                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                    />
                                    <div class="author-info">
                                      <p>{{ review.author }}</p>
                                      <p class="created-at">
                                        {{
                                          review.created_at.replace(/\.\d+/, "")
                                        }}
                                      </p>
                                    </div>
                                  </div>
                                  <div
                                    class="author-info-right"
                                    v-if="review.user == userId"
                                  >
                                    <a
                                      ><EditOutlined
                                        @click="changeStatusEdit(index)"
                                    /></a>
                                    <a-popconfirm
                                      title="Are you sure delete this company?"
                                      ok-text="Yes"
                                      cancel-text="No"
                                      @confirm="confirmDelete(review.id)"
                                    >
                                      <a><DeleteOutlined /></a>
                                    </a-popconfirm>
                                  </div>
                                </div>
                                <div class="rating">
                                  <a-rate
                                    v-bind:value="review.rating"
                                    disabled
                                  />
                                  {{ review.rating }}
                                </div>
                                <p v-if="!editStatus[index]">
                                  {{ review.comment }}
                                </p>
                                <a-form class="form-write-review" v-else>
                                  <a-form-item name="email">
                                    <a-textarea
                                      placeholder="Write your comment..."
                                      auto-size
                                      v-model:value="editComment"
                                    />
                                    <a-button
                                      class="send-icon"
                                      @click="
                                        editReview(
                                          review.id,
                                          id,
                                          review.user,
                                          index
                                        )
                                      "
                                    >
                                      <span><SendOutlined /></span>
                                    </a-button>
                                  </a-form-item>
                                </a-form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="review-box">
                        <div class="review-box__content">
                          <div class="review-box__content__review">
                            <h2>Write your review</h2>
                            <div class="top-review__action">
                              <a-button class="actions-btn"
                                >Write review</a-button
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div></a-tab-pane
                  >
                </a-tabs>
              </div>
            </div>
          </div>
        </div>
      </a-layout-content>
      <Footer />
    </a-layout>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Header from "../layouts/header.vue";
import Footer from "../layouts/footer.vue";
import Job from "../components/job-view/Job.vue";
import axios from "axios";
import { Comment } from "../utils";
import { message } from "ant-design-vue";
import {
  PhoneFilled,
  MailFilled,
  WifiOutlined,
  SendOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons-vue";
import store from "../store";
export default defineComponent({
  name: "CompanyDetail",
  data() {
    const id: Number = Number(this.$route.params.id);
    const userId = store.state.user.id;
    const comment: Comment = { user: userId, company: id };
    const listComments: Comment[] = [];
    return {
      id,
      listJobs: [],
      company_detail: {},
      comment,
      listComments,
      userId,
      editComment: "",
      visible: false,
      editStatus: [],
      indexStatus: null,
    };
  },
  components: {
    Header,
    Footer,
    Job,
    WifiOutlined,
    PhoneFilled,
    MailFilled,
    SendOutlined,
    DeleteOutlined,
    EditOutlined,
  },
  mounted() {
    this.getJobByCompany();
    this.getCompanyDetails();
  },
  watch: {
    listComments() {
      const total = this.listComments.length;
      this.editStatus = Array(total).fill(false);
    },
  },
  methods: {
    changeStatusEdit(index: number) {
      const isExists =
        Boolean(this.indexStatus + 1) &&
        Boolean(this.indexStatus != index) &&
        Boolean(this.editStatus[this.indexStatus] == true);
      if (isExists) {
        this.editStatus[this.indexStatus] = false;
      }
      this.editComment = this.listComments[index].comment;
      this.editStatus[index] = !this.editStatus[index];
      this.indexStatus = index;
    },
    async getJobByCompany() {
      await axios
        .get("jobs/company/get_jobs", {
          params: { company_id: this.id },
        })
        .then((response) => {
          this.listJobs = response.data;
        })
        .catch((error) => console.log(error));
    },
    async getCompanyDetails() {
      await axios
        .get("companies/companies/" + this.id)
        .then((response) => {
          this.company_detail = response.data;
          response.data.reviews?.map((item: any) => {
            const comment: Comment = {
              id: item["id"],
              rating: item["rating"],
              comment: item["comment"],
              author: item["author"],
              created_at: item["author"],
              company: item["company"]["id"],
              user: item["user"]["id"],
            };
            this.listComments.push(comment);
          });
        })
        .catch((error) => console.log(error));
    },
    async createComment() {
      console.log(this.userId);
      if (!this.userId) this.$router.push({ name: "login" });
      await axios
        .post("reviews/reviews/create", this.comment)
        .then((response) => {
          const newComment: Comment = response.data;
          this.listComments.push(newComment);
          this.comment = { user: this.userId, company: this.id };
        })
        .catch((error) => console.log(error));
    },
    async confirmDelete(id: Number) {
      await axios
        .delete("comment_posts/comments/delete/" + id)
        .then(() => {
          this.listComments = this.listComments.filter(
            (item: { id: Number }) => item.id != id
          );
          message.success("Delete success");
        })
        .catch(() => message.error("Delete failed"));
    },
    async editReview(id: number, job: number, user: number, index: number) {
      const comment = {
        job,
        user,
        comment_body: this.editComment,
      };
      console.log(comment);
      await axios
        .patch("comment_posts/comments/update/" + id, comment)
        .then((response) => {
          this.listComments[index].comment = this.editComment;
          this.editComment = "";
          this.editStatus[index] = false;
        })
        .catch((error) => error);
    },
  },
});
</script>
<style scoped>
.home main.ant-layout-content {
  position: relative;
  top: 64px;
  background-color: #f9f8f8;
}
.container {
  position: relative;
  padding-bottom: 5px;
}
.company-detail {
  margin: 0px !important;
}
.company-detail-content {
  margin: 0 auto;
  max-width: 1100px;
  background-color: transparent;
  border: none;
}
.company-introduce {
  min-height: 200px;
  display: flex;
  align-items: center;
  border: 1px solid #d8d8d8;
  border-radius: 0 0 3px 3px;
  justify-content: space-between;
  background: white;
}

.company-detail-content .company-detail-wrapper {
  display: grid;
  grid-template-columns: 1fr 0.6fr;
  grid-gap: 10px;
  min-height: 500px;
  margin-top: 16px;
  padding-top: 4px;
}
.company-description,
.job-opportunities,
.review-box__content {
  min-height: 100px;
  background: white;
  border: 1px solid #d8d8d8;
  border-radius: 3px;
  margin-bottom: 1rem !important;
}
.company-introduce__logo {
  margin-top: -5px;
  margin-left: 30px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.company-introduce__logo__img {
  width: 160px;
  height: 150px;
  background: white;
  border: 1px solid #d2d2d2;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
}
.company-introduce__logo__img img {
  display: block;
  position: relative;
  max-width: 140px;
  max-height: 140px;
  width: auto;
  height: auto;
  margin: auto;
}
.company-introduce__info {
  padding-bottom: 10px;
  margin-bottom: 10px;
  margin-left: 25px;
  flex: 1;
}
.company-introduce__info__name {
  line-height: 35px;
  font-size: 32px;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: left;
}
.company-introduce__info__item {
  display: grid;
  grid-row-gap: 5px;
}
.info-item {
  display: flex;
  align-items: center;
}
.info-item__text {
  margin-left: 10px;
  font-size: 15px;
}
.company-introduce__actions {
  padding: 30px 20px;
  margin-right: 30px;
  flex: 0 0 220px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.actions-btn {
  border: 1px solid #ea2635;
  color: #fff;
  background-color: #ea2635;
  width: 150px;
  height: 40px;
  line-height: 36px;
  padding: 0;
  outline: 0;
  text-decoration: none;
  position: relative;
  font-family: "Roboto", sans-serif;
  font-weight: 400 !important;
  border-radius: 4px;
  font-size: 17px;
  white-space: nowrap;
  -webkit-font-smoothing: antialiased;
  display: inline-block;
  text-align: center;
  margin-bottom: 10px;
}
.follow {
  color: #ea1e30;
  border: 0;
  background-color: #fff;
  text-decoration: none;
  border: 1px solid #ea2635;
}
.company-description,
.review-box__content {
  padding: 15px 30px;
  padding-bottom: 20px;
  text-align: left;
}
.company-detail-wrapper h2 {
  font-size: 25px;
  margin: 10px 0;
}
.company-description__text {
  font-style: italic;
  font-size: 15px;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
.company-description .rating,
.review-box__content__rating .rating {
  margin: 10px 0;
  margin-left: 20px;
  text-align: center;
  font-size: 19px;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-weight: 550;
}
.company-description ul.ant-rate.ant-rate-disabled,
.review-box__content__rating ul.ant-rate.ant-rate-disabled {
  font-size: 20px !important;
}
.top-review__item {
  padding: 10px 0;
  border-bottom: 1px solid #d2d2d2;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
.top-review__item h3 {
  font-size: 18px;
  font-weight: 550;
}
.top-review__item .rating {
  text-align: center !important;
  font-size: 16px;
}
.top-review__item p {
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  line-height: 20px;
  font-size: 15px;
  font-style: italic;
  margin: 10px 0;
}
.top-review__action {
  text-align: right;
}
.top-review__action a.view-all {
  text-decoration: underline;
}
.top-review__action .actions-btn {
  margin: 10px 0;
  width: 100%;
}
.job-opportunities .review-box__content__review {
  padding: 20px 60px;
}
.author {
  display: flex;
  color: #007082;
}
.author p {
  padding-left: 10px;
}
.created-at {
  font-size: 13px;
  color: #888686;
}
.author-info p {
  margin: 0;
}
.write-review {
  display: flex;
}
.form-write-review {
  padding-left: 10px;
  width: 100%;
}
.form-write-review textarea.ant-input {
  width: 100% !important;
  min-height: 40px;
  font-size: 15px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  margin-top: 10px;
}
.send-icon {
  position: absolute;
  z-index: 0;
  right: 10px;
  bottom: 10px;
  color: #d2d2d2;
  padding: 0;
  height: fit-content;
  width: fit-content;
  border: none;
}
.send-icon span.anticon {
  padding: 0;
}
.author {
  display: flex;
  justify-content: space-between;
}
.author-info-left {
  display: flex;
}
</style>
