<template>
  <div class="mt-4 card p-4">
    <div class="d-flex justify-content-between align-items-center">
      <h3 class="mb-4 text-capitalize">Update Blog Category</h3>
      <i class="bi bi-three-dots-vertical"></i>
    </div>

    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="categoryName" class="form-label">Category Name</label>
        <input
          type="text"
          id="categoryName"
          v-model="categoryName"
          class="form-control"
          required
        />
      </div>

      <div class="text-end gap-2">
        <button type="submit" class="btn btn-primary">Update</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const categoryName = ref(""); // Initialize with existing category name for editing

const handleSubmit = () => {

  console.log("Updating category:", categoryName.value);
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
