<template>
  <div class="user-show">
    <div class="container">
      <div class="my-profile">
        <div class="my-profile-wrapper">
          <div class="my-account-info-box">
            <div class="nav">
              <a-tabs>
                <a-tab-pane class="nav-item" key="1" tab="Profile">
                  <div class="tab-content-label">
                    <h2 class="cv-missing-text">YOU CV IS MISSING</h2>
                    <p class="cv-missing__description">
                      Upload CV to apply for jobs faster and get attractive
                      invitation from emloyers
                    </p>
                  </div>
                  <div class="tab-content-container">
                    <div class="cv-missing__wrapper">
                      <a-card hoverable style="width: 300px">
                        <template #cover>
                          <div class="upload-file__logo">
                            <img alt="example" src="../assets/logo.png" />
                          </div>
                        </template>
                        <a-card-meta
                          title="Card title"
                          description="This is the description"
                        >
                        </a-card-meta>
                      </a-card>
                    </div>
                  </div>
                </a-tab-pane>
                <a-tab-pane class="nav-item" key="2" tab="Account" force-render
                  >Content of Tab Pane 2</a-tab-pane
                >
              </a-tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "EmptyProfile",
};
</script>
<style>
.container {
  background-color: #e9e9e9;
  position: relative;
}
.my-profile {
  margin: 30px auto;
  max-width: 1350px;
  min-height: 700px;
  height: calc(100vh - 360px);
  background-color: transparent;
  border: none;
}

.my-profile .my-profile-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  background-color: #e9e9e9;
  height: 100%;
}
.my-profile .my-account-info-box {
  height: 100%;
  overflow: hidden;
  background-color: white;
}
.nav .ant-tabs-nav-wrap {
  height: 60px;
}
.nav .ant-tabs-tab-btn {
  width: 160px;
}
.nav .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
  color: #007082;
}
.nav .ant-tabs-tab.ant-tabs-tab-active {
  color: #5c5a5b;
}
.nav .ant-tabs-ink-bar {
  background: #007082;
  border-bottom: 3px solid #007082;
}
.nav .ant-tabs-tab {
  font-size: 18px !important;
  font-weight: bolder;
  color: #5c5a5b;
}
.nav .ant-tabs-content {
  margin: 0 25px 25px;
  text-align: left;
}
.nav .cv-missing-text {
  font-weight: 550;
  margin: 12px 0 5px;
}
.nav .cv-missing__description {
  font-size: 16px;
}
.nav .cv-missing-container {
  display: flex !important;
  gap: 0.5rem !important;
  justify-content: space-between !important;
}
.nav .cv-missing__wrapper {
  display: flex !important;
  position: relative !important;
  width: 100% !important;
  justify-content: center !important;
  align-items: center !important;
  border: 1px solid #dee2e6;
  padding: 15px 15px;
  min-height: 258px;
}
</style>
