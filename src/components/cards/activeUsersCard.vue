<template>
  <div class="mt-4 card">
    <div class="d-flex justify-content-between">
      <h3 class="mb-4">Active users</h3>
      <i class="bi bi-three-dots-vertical"></i>
    </div>
    <div class="number-container">
      <h4 class="text-center number">{{ totalUsers }}</h4>
    </div>

    <div
      class="d-flex justify-content-between mb-0 border-bottom border-gray text-center"
    >
      <p class="">Active pages</p>
      <p class="">Users</p>
    </div>

    <div
      v-for="(page, index) in activePages"
      :key="index"
      class="d-flex justify-content-between mb-0 mt-2 border-bottom border-gray text-center"
    >
      <p class="">{{ page.name }}</p>
      <p class="">{{ page.users }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useBlogStore } from "@/store/useBlogStore";
import { useCustomerStore } from "@/store/useCustomerStore";
import { useEnquiryStore } from "@/store/useEnquriesStore";

const blogStore = useBlogStore();
const customerStore = useCustomerStore();
const enqStore = useEnquiryStore();

const blogCount = computed(() => blogStore?.blogs?.length);
const enqCount = computed(() => enqStore?.enquiries?.length);
const customerCount = computed(() => customerStore?.customers?.length);

const activePages = ref([
  { name: "/customers", users: customerCount },
  { name: "/catalog", users: 6 }, //TODO
  { name: "/orders", users: 7 },
  { name: "/blogs", users: blogCount },
  { name: "/enquiries", users: enqCount },
]);

const totalUsers = computed(() => {
  return activePages.value.reduce((sum, page) => {
    return sum + page.users;
  }, 0);
});

onMounted(async () => {
  await blogStore.fetchBlogs();
  await enqStore.fetchEnquiries();
  await customerStore.fetchCustomers();
});
</script>

<style scoped>
.number-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: cornflowerblue;
  border-radius: 5px;
  padding: 30px;
  margin-bottom: 15px;
}

.number {
  margin: 0;
  color: blue;
}

.card p,
.card h3 {
  color: gray;
}
</style>
