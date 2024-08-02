<template>
  <LoadingScreen v-if="orderStore?.loading" />
  <div class="mt-4 card p-4" v-if="orderStore?.orders?.length">
    <!-- <div class="mt-4 card p-4"> -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3></h3>
      <i class="bi bi-three-dots-vertical"></i>
    </div>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>No</th>
            <th>Status</th>
            <th>Comment</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="hover-row"
            v-for="order in orderStore?.orders"
            :key="order?.id"
          >
            <td>{{ orderNo }}</td>
            <!-- <td>{{ order?.status }}</td> -->
            <td>{{ getStatusTag(order?.status) }}</td>
            <td>{{ order?.comment }}</td>
            <td>{{ order?.firstname }} {{ order?.lastname }}</td>
            <!-- <td>{{ order?.createdAt }}</td> -->
            <td>{{ new Date(order?.createdAt).toLocaleDateString() }}</td>
            <td>{{ order?.total || "N/A" }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else>
    <Empty />
  </div>
</template>

<script setup>
import { h, onMounted, ref } from "vue";
import { Tag } from "ant-design-vue";
import Empty from "@/components/empty.vue";
import { useOrderStore } from "@/store/useOrdersStore";
import LoadingScreen from "@/components/loadingScreen.vue";

defineProps({
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

// eslint-disable-next-line no-unused-vars
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

const orderStore = useOrderStore();
console.log("orderStore:", orderStore); // #TODO : fix issue with display order

// onMounted(async () => await orderStore.fetchOrders());
onMounted(async () => {
  await orderStore.fetchOrders(), console.log("Order:", orderStore.orders);
});

const generateOrderNo = (length = 4) => {
  const chars = "0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `#${result}`;
};

const orderNo = ref(generateOrderNo());
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
