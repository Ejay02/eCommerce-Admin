<template>
  <div class="mt-4 card">
    <div class="d-flex justify-content-between">
      <h3 class="mb-4">Recent Orders</h3>
      <i class="bi bi-three-dots-vertical"></i>
    </div>

    <div class="">
      <a-table
        class="ant-table-striped"
        size="middle"
        :columns="columns"
        :data-source="data"
        :row-class-name="
          (_record, index) => (index % 2 === 1 ? 'table-striped' : null)
        "
      />
    </div>
  </div>
</template>

<script setup>
import { h } from "vue";
import { Tag } from "ant-design-vue";

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
  {
    key: "4",
    no: "#00089",
    status: "Cancelled",
    country: "🏁",
    initial: "MC",
    name: "Marie Curie",
    date: "2024-05-05",
    total: "$384.00",
  },
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
}
</style>
