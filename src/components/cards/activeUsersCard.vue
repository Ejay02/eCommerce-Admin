<template>
  <div class="mt-4 card">
    <div class="d-flex justify-content-between">
      <h3 class="mb-4">Active users</h3>
      <i class="bi bi-three-dots-vertical"></i>
    </div>
    <div class="number-container">
      <h4 class="text-center number">148</h4>
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
import { ref } from "vue";

const activePages = ref([
  { name: "/customers", users: 18 },
  { name: "/catalog", users: 6 },
  { name: "/orders", users: 7 },
  { name: "/blogs", users: 3 },
  { name: "/enquiries", users: 1 },
]);
</script>

<style scoped>
/* .card {
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  flex: 1;
  min-width: calc(33.3% - 10px);
  box-sizing: border-box;
  transition: background-color 0.3s, box-shadow 0.3s;
} */

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
