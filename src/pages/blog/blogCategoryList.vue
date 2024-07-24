<template>
  <div class="mt-4 card">
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
        <button class="btn" @click="handleDelete(category._id)">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>
    <div v-else>
      <p>No categories available</p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

import { useNotifications } from "@/composable/globalAlert.js";

const { notify } = useNotifications();
const categories = ref([]);

const isLocalhost = window.location.hostname === "localhost";

const handleFetchBlogCat = async () => {
  const baseURL = isLocalhost
    ? import.meta.env.VITE_BASE_URL_LOCAL
    : import.meta.env.VITE_BASE_URL;
  try {
    const response = await axios.get(`${baseURL}/blog-category`);

    if (response.data) {
      categories.value = response.data;
    }
  } catch (error) {
    notify("Error fetching data", "error");
  }
};

const handleDelete = async (id) => {
  const baseURL = isLocalhost
    ? import.meta.env.VITE_BASE_URL_LOCAL
    : import.meta.env.VITE_BASE_URL;
  try {
    const response = await axios.delete(`${baseURL}/blog-category/${id}`);

    if (response.data) {
      // Optionally filter out the deleted category from the categories array
      categories.value = categories.value.filter(
        (category) => category._id !== id
      );
      notify("Category deleted successfully!", "success");
    }
  } catch (error) {
    notify("Error deleting category", "error");
  }
};

onMounted(() => {
  handleFetchBlogCat();
});
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

.bi {
  color: red;
}

.btn {
  text-decoration: none;
  border: none;
}
</style>
