<template>
  <div class="mt-4 card">
    <div class="d-flex justify-content-between align-items-center">
      <h3 class="mb-4 text-capitalize"></h3>
      <i class="bi bi-three-dots-vertical"></i>
    </div>
    <div v-if="categories.length">
      <div
        v-for="category in categories"
        :key="category._id"
        class="category-item"
      >
        <div class="category-title">
          <h4>{{ category.title }}</h4>
          <span class="text-muted">
            Date Created:
            {{ new Date(category.createdAt).toLocaleDateString() }}
          </span>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No categories available</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const categories = ref([
  {
    _id: "1",
    title: "Tech",
    createdAt: "2023-01-01T00:00:00Z",
  },
  {
    _id: "2",
    title: "Lifestyle",
    createdAt: "2023-02-01T00:00:00Z",
  },
  {
    _id: "3",
    title: "Travel",
    createdAt: "2023-03-01T00:00:00Z",
  },
]);
</script>

<style scoped>
.card {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  padding: 16px;
}

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 16px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.category-item:hover {
  background-color: #e9e9e9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.category-title {
  display: flex;
  flex-direction: column;
}

.category-title h4 {
  margin: 0;
  font-size: 1.2rem;
  /* color: #343a40; */
  color: #6c757d;
}

.category-title .text-muted {
  font-size: 0.9rem;
  color: #6c757d;
}
</style>
