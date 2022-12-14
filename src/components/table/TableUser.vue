<template>
  <a-table :dataSource="dataSource" :columns="columns">
    <template #role="{ text: role }">
      <span>
        <a-tag
          :key="role"
          :color="
            role === 'admin'
              ? 'volcano'
              : role === 'employer'
              ? 'geekblue'
              : 'green'
          "
        >
          {{ role?.toUpperCase() }}
        </a-tag>
      </span>
    </template>
    <template #status="{ record }">
      <a-popconfirm
        :title="
          record.status == true
            ? 'Your want to disable this account'
            : 'Your want to enable this account'
        "
      >
        <span>
          <a-switch size="small" v-model:checked="record.status" />
        </span>
      </a-popconfirm>
    </template>
    <template #action="{ record }">
      <a-popconfirm v-if="dataSource.length" title="Sure to delete?">
        <a>Delete</a>
      </a-popconfirm>
    </template>
  </a-table>
</template>
<script>
export default {
  name: "TableUser",
  setup() {
    return {
      dataSource: [
        {
          email: "anhtuyetdutk19@gmail.com",
          age: 32,
          role: "admin",
          created_at: "2020-05-12T23:50:21Z",
          status: true,
          address: "Da Nang",
        },
        {
          email: "bingando123@gmail.com",
          status: false,
          role: "seeker",
          created_at: "2020-05-12T23:50:21Z",
          age: 42,
          address: "Ha Noi",
        },
        {
          email: "admin@jobfinder.com",
          age: 32,
          role: "admin",
          created_at: "2020-05-12T23:50:21Z",
          status: true,
          address: "Ho Chi Minh",
        },
        {
          email: "seeker@jobfinder.com",
          status: false,
          role: "seeker",
          created_at: "2020-05-12T23:50:21Z",
          age: 42,
          address: "Ho Chi Minh",
        },
        {
          email: "employer@jobfinder.com",
          age: 32,
          role: "employer",
          created_at: "2020-05-12T23:50:21Z",
          status: true,
          address: "Da Nang",
        },
        {
          email: "seeker1@jobfinder.com",
          status: true,
          role: "seeker",
          created_at: "2020-05-12T23:50:21Z",
          age: 42,
          address: "Ha Noi",
        },
        {
          email: "seeker2@jobfinder.com",
          age: 32,
          role: "seeker",
          created_at: "2020-05-12T23:50:21Z",
          status: true,
          address: "Da Nang",
        },
        {
          email: "employer2@jobfinder.com",
          status: true,
          role: "employer",
          created_at: "2020-05-12T23:50:21Z",
          age: 42,
          address: "Da Nang",
        },
      ],

      columns: [
        {
          title: "Email",
          dataIndex: "email",
          className: "custome-column",
          key: "email",
          style: "text-align: center !important",
          width: "25%",
        },
        {
          title: "Role",
          dataIndex: "role",
          key: "role",
          className: "custome-column",
          slots: { customRender: "role" },
          width: "15%",
        },
        {
          title: "Created at",
          dataIndex: "created_at",
          className: "custome-column",
          key: "created_at",
        },
        {
          title: "Status",
          dataIndex: "status",
          key: "status",
          className: "custome-column",
          slots: { customRender: "status" },
          width: "15%",
        },
        {
          title: "Action",
          dataIndex: "action",
          key: "action",
          className: "custome-column",
          slots: { customRender: "action" },
          width: "15%",
        },
      ],
    };
  },
};
</script>
<style scoped>
.account-table thead.ant-table-thead {
  font-weight: 550 !important;
}
</style>
