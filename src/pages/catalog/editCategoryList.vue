<template>
  <div class="mt-4 card">
    <div class="d-flex justify-content-between">
      <h3 class="mb-4"></h3>
      <i class="bi bi-three-dots-vertical"></i>
    </div>

    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="title" class="form-label"></label>
        <input
          type="text"
          id="title"
          v-model="formData.title"
          class="form-control"
          required
          autofocus
          placeholder="Enter category name ..."
        />
      </div>

      <div class="text-end mt-3">
        <router-link
          type="submit"
          to="/admin/product/category-list"
          class="btn mt-3 gap-5 bn"
        >
          Cancel
        </router-link>

        <button
          type="submit"
          class="btn btn-primary mt-3"
          @click="handleSubmit"
        >
          Update
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import axios from "axios";
import router from "@/router";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useNotifications } from "@/composable/globalAlert.js";

const route = useRoute();
const { notify } = useNotifications();

const formData = ref({
  title: "",
});

const fetchDetails = async () => {
  const categoryId = route.params.id;
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/category/${categoryId}`
    );

    Object.assign(formData.value, response.data);
  } catch (error) {
    notify("Error fetching details", "error");
  }
};

const handleSubmit = async () => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/category/${route.params.id}`,
      formData.value
    );

    if (response.data) {
      router.push("/admin/product/category-list");
      notify("Category updated successfully!", "success");
    }
  } catch (error) {
    notify("Error updating category", "error");
  }
};

onMounted(() => {
  fetchDetails();
});
</script>

<style scoped></style>
