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

    <div class="">
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
import { useRoute } from 'vue-router';

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
  {
    key: "5",
    no: "#01001",
    status: "Pending",
    country: "🇺🇸",
    initial: "EW",
    name: "Emily White",
    date: "2024-05-06",
    total: "$1,200.00",
  },
  {
    key: "6",
    no: "#01002",
    status: "Completed",
    country: "🇨🇦",
    initial: "BL",
    name: "Brian Lee",
    date: "2024-05-06",
    total: "$3,450.00",
  },
  {
    key: "7",
    no: "#01003",
    status: "Hold",
    country: "🇬🇧",
    initial: "AM",
    name: "Alice Moore",
    date: "2024-05-06",
    total: "$1,750.00",
  },
  {
    key: "8",
    no: "#01004",
    status: "Cancelled",
    country: "🇦🇺",
    initial: "RJ",
    name: "Robert Johnson",
    date: "2024-05-06",
    total: "$420.00",
  },
  {
    key: "9",
    no: "#01005",
    status: "Pending",
    country: "🇳🇿",
    initial: "PM",
    name: "Peter Mitchell",
    date: "2024-05-07",
    total: "$980.00",
  },
  {
    key: "10",
    no: "#01006",
    status: "Completed",
    country: "🇮🇳",
    initial: "SD",
    name: "Samantha Davis",
    date: "2024-05-07",
    total: "$2,100.00",
  },
  {
    key: "11",
    no: "#01007",
    status: "Hold",
    country: "🇯🇵",
    initial: "KN",
    name: "Ken Nakamura",
    date: "2024-05-07",
    total: "$1,650.00",
  },
  {
    key: "12",
    no: "#01008",
    status: "Cancelled",
    country: "🇨🇳",
    initial: "LZ",
    name: "Ling Zhang",
    date: "2024-05-07",
    total: "$340.00",
  },
  {
    key: "13",
    no: "#01009",
    status: "Pending",
    country: "🇰🇷",
    initial: "HS",
    name: "Hana Seo",
    date: "2024-05-08",
    total: "$780.00",
  },
  {
    key: "14",
    no: "#01010",
    status: "Completed",
    country: "🇧🇷",
    initial: "CM",
    name: "Carlos Mendes",
    date: "2024-05-08",
    total: "$2,400.00",
  },
  {
    key: "15",
    no: "#01011",
    status: "Hold",
    country: "🇿🇦",
    initial: "MT",
    name: "Mary Thompson",
    date: "2024-05-08",
    total: "$1,900.00",
  },
  {
    key: "16",
    no: "#01012",
    status: "Cancelled",
    country: "🇫🇷",
    initial: "JB",
    name: "Jean Bernard",
    date: "2024-05-08",
    total: "$410.00",
  },
  {
    key: "17",
    no: "#01013",
    status: "Pending",
    country: "🇩🇪",
    initial: "HK",
    name: "Hans Klein",
    date: "2024-05-09",
    total: "$960.00",
  },
  {
    key: "18",
    no: "#01014",
    status: "Completed",
    country: "🇮🇹",
    initial: "MV",
    name: "Maria Verdi",
    date: "2024-05-09",
    total: "$2,300.00",
  },
  {
    key: "19",
    no: "#01015",
    status: "Hold",
    country: "🇪🇸",
    initial: "PA",
    name: "Pablo Alvarez",
    date: "2024-05-09",
    total: "$1,500.00",
  },
  {
    key: "20",
    no: "#01016",
    status: "Cancelled",
    country: "🇳🇱",
    initial: "DV",
    name: "Dirk Van Der Meer",
    date: "2024-05-09",
    total: "$380.00",
  },
  {
    key: "21",
    no: "#01017",
    status: "Pending",
    country: "🇷🇺",
    initial: "AK",
    name: "Anya Kuznetsova",
    date: "2024-05-10",
    total: "$800.00",
  },
  {
    key: "22",
    no: "#01018",
    status: "Completed",
    country: "🇸🇦",
    initial: "FA",
    name: "Fatima Al Saud",
    date: "2024-05-10",
    total: "$2,600.00",
  },
  {
    key: "23",
    no: "#01019",
    status: "Hold",
    country: "🇹🇷",
    initial: "EM",
    name: "Emre Mehmet",
    date: "2024-05-10",
    total: "$1,750.00",
  },
  {
    key: "24",
    no: "#01020",
    status: "Cancelled",
    country: "🇲🇽",
    initial: "CR",
    name: "Carlos Rivera",
    date: "2024-05-10",
    total: "$400.00",
  },
  {
    key: "25",
    no: "#01021",
    status: "Pending",
    country: "🇳🇴",
    initial: "OS",
    name: "Ola Svensen",
    date: "2024-05-11",
    total: "$700.00",
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

.bi {
  color: gray;
}
</style>
