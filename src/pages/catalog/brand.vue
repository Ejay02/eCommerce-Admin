<template>
  <div class="mt-4 card">
    <div class="d-flex justify-content-between">
      <h3 class="mb-4"></h3>
      <!-- <h3 class="mb-4">brand</h3> -->
      <i class="bi bi-three-dots-vertical"></i>
    </div>

    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <!-- <label for="title" class="form-label">Brand Name</label> -->
        <label for="title" class="form-label"></label>
        <input
          type="text"
          id="title"
          v-model="title"
          class="form-control"
          required
          autofocus
          placeholder="Enter brand name ..."
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
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/brand`,
      {
        title: title.value,
      }
    );

    if (response.data) {
      notify("Brand added successfully!", "success");
      router.push("/admin/product/brand-list");
    }
  } catch (error) {
    notify("Error adding brand", "error");
  }
};

const isFormFilled = computed(() => {
  return title.value;
});
</script>

<style scoped></style>
