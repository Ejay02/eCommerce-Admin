<template>
  <div class="mt-4 card p-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="mb-0">{{ props.title }}</h3>

      <router-link to="/admin/orders" class="text-decoration-none">
        <i
          v-if="route.path === '/admin/dashboard'"
          class="bi bi-arrow-right fs-5"
        ></i>
        <i
          v-else-if="route.path === '/admin/orders'"
          class="bi bi-three-dots-vertical"
        ></i>
        <!-- {{props.icon}} -->
      </router-link>
    </div>

    <div class="table-responsive">
      <a-table
        class="ant-table-striped"
        size="middle"
        :columns="columns"
        :data-source="data"
        :row-class-name="
          (_record, index) => (index % 2 === 1 ? 'table-striped' : null)
        "
        :pagination="{ pageSize: pageSize }"
      />
    </div>
  </div>
</template>

<script setup>
import { h } from "vue";
import { Tag } from "ant-design-vue";
import { useRoute } from "vue-router";

const route = useRoute();

const props = defineProps({
  pageSize: {
    type: Number,
    default: 1,
  },
  title: {
    type: String,
  },
  icon: {
    type: String,
  },
});

const getStatusTag = (status) => {
  let color;
  switch (status) {
    case "Completed":
      color = "green";
      break;
    case "Hold":
      color = "yellow";
      break;
    case "Cancelled":
      color = "red";
      break;
    case "Pending":
      color = "blue";
      break;
    default:
      color = "default";
  }
  return h(Tag, { color }, { default: () => status });
};

const getCustomerWithInitial = (name, initial) => {
  return h("span", null, [
    h(Tag, { color: "#d3d3d3" }, { default: () => initial }),
    ` ${name}`,
  ]);
};

const columns = [
  {
    title: "No",
    dataIndex: "no",
    customRender: ({ text }) => h("span", { style: { color: "gray" } }, text),
  },
  {
    title: "Status",
    dataIndex: "status",
    customRender: ({ text }) => getStatusTag(text),
  },
  {
    title: "Co.",
    dataIndex: "country",
  },
  {
    title: "Customer",
    dataIndex: "name",
    customRender: ({ record }) =>
      h(
        "span",
        { style: { color: "gray" } },
        getCustomerWithInitial(record.name, record.initial)
      ),
  },
  {
    title: "Date",
    dataIndex: "date",
    customRender: ({ text }) => h("span", { style: { color: "gray" } }, text),
  },
  {
    title: "Total",
    dataIndex: "total",
    customRender: ({ text }) => h("span", { style: { color: "gray" } }, text),
  },
];

const data = [
  {
    key: "1",
    no: "#00922",
    status: "Pending",
    country: "🏳️‍⚧️",
    initial: "JB",
    name: "John Brown",
    date: "2024-05-05",
    total: "$2,984.00",
  },
  {
    key: "2",
    no: "#00409",
    status: "Hold",
    country: "🏳️‍🌈",
    initial: "TS",
    name: "Taylor Swift",
    date: "2024-05-05",
    total: "$984.00",
  },
  {
    key: "3",
    no: "#00239",
    status: "Completed",
    country: "🏳️",
    initial: "KJ",
    name: "Kehinde Jones",
    date: "2024-05-05",
    total: "$5,984.00",
  },
  // Add more data entries as needed
];
</script>

<style scoped>
[data-doc-theme="light"] .ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}
[data-doc-theme="dark"] .ant-table-striped :deep(.table-striped) td {
  background-color: rgb(29, 29, 29);
}

.card {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  padding: 16px;
}

.bi {
  color: gray;
}

.table-responsive {
  overflow-x: auto;
}
</style>
