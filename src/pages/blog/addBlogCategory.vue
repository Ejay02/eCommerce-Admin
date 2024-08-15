<template>
  <div class="mt-4 card p-4">
    <div class="d-flex justify-content-between align-items-center">
      <h3 class="mb-4 text-capitalize"></h3>
      <i class="bi bi-three-dots-vertical"></i>
    </div>

    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="title" class="form-label"></label>
        <input
          type="text"
          id="title"
          v-model="title"
          class="form-control"
          required
          autofocus
          placeholder="Blog Category title..."
        />
      </div>

      <div class="text-end gap-2">
        <button
          type="submit"
          class="btn btn-primary"
          @click="handleSubmit"
          :disabled="!isFormFilled"
        >
          Add
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import axios from "axios";
import router from "@/router";
import { computed, ref } from "vue";
import { useNotifications } from "@/composable/globalAlert.js";

const { notify } = useNotifications();

const title = ref("");

const handleSubmit = async () => {
  try {
    const trimmedTitle = title.value.trim(); // Trim the title here
    if (!trimmedTitle) {
      return; // Optionally handle empty title, but the button should be disabled anyway
    }

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/blog-category`,
      {
        // title: title?.value,
        title: trimmedTitle,
      }
    );

    if (response?.data) {
      notify("Category added successfully!", "success");
      router.push("/admin/blog/blog-category-list");
    }
  } catch (error) {
    notify("Error adding category", "error");
  }
};

const isFormFilled = computed(() => {
  // return title.value;
  return !!title.value?.trim();
});
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
