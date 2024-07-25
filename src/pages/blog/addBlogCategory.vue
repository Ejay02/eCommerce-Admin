<template>
  <div class="mt-4 card p-4">
    <div class="d-flex justify-content-between align-items-center">
      <h3 class="mb-4 text-capitalize">Add Blog Category</h3>
      <i class="bi bi-three-dots-vertical"></i>
    </div>

    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="title" class="form-label">Category Name</label>
        <input
          type="text"
          id="title"
          v-model="title"
          class="form-control"
          required
        />
      </div>

      <div class="text-end gap-2">
        <button type="submit" class="btn btn-primary" @click="handleSubmit">
          Add
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useNotifications } from "@/composable/globalAlert.js";

const { notify } = useNotifications();

const title = ref("");

const handleSubmit = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/blog-category`,
      {
        title: title.value,
      }
    );

    if (response.data) {
      notify("Category added successfully!", "success");
    }
    title.value = "";
  } catch (error) {
    notify("Error adding category", "error");
  }
};
</script>

<style scoped>
.card {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.form-control {
  width: 100%;
  padding: 8px;
  font-size: 1rem;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>
