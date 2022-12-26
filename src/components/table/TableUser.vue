<template>
  <div class="total-account">Total: {{ total }}</div>
  <a-table :dataSource="dataSource" :columns="columns" :scroll="{ y: 400 }">
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
    <template #is_active="{ record }">
      <a-popconfirm
        :title="
          record.is_active == true
            ? 'Your want to disable this account'
            : 'Your want to enable this account'
        "
      >
        <span>
          <a-switch size="small" v-model:checked="record.is_active" />
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
<script lang="ts">
import axios from "axios";
import { AccountView } from "@/utils";
export default {
  name: "TableUser",
  data() {
    return {
      dataSource: [],
      total: 0,

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
          dataIndex: "is_active",
          key: "is_active",
          className: "custome-column",
          slots: { customRender: "is_active" },
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
  mounted() {
    this.getListAcc();
  },
  methods: {
    async getListAcc() {
      const data = await axios
        .get("auth/admin/list-accounts")
        .then((response) => {
          const data = response.data;
          this.total = data.length;
          data.map((item: AccountView) =>
            this.dataSource.push({
              email: item.email,
              role: item.role,
              gender: item.gender,
              is_active: item.is_active.toLowerCase() === "true" ? true : false,
              created_at: item.created_at,
            })
          );
        })
        .catch(() => []);
    },
    async deleteAcc(id: Number) {
      await axios
        .delete("auth/admin/delete-accounts/" + id)
        .then(() => true)
        .catch(() => false);
    },
  },
};
</script>
<style scoped>
.account-table thead.ant-table-thead {
  font-weight: 550 !important;
}
.total-account {
  text-align: left;
  padding-bottom: 10px;
  padding-left: 10px;
  font-size: 18px;
  font-family: Tahoma, sans-serif;
  color: rgb(188, 71, 108);
}
</style>
