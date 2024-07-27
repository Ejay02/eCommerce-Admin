<template>
  <LoadingScreen v-if="categoryStore.loading" />
  <div v-else class="mt-4 card">
    <div v-if="categoryStore.categories.length">
      <div
        v-for="category in categoryStore.categories"
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
        <button
          class="btn"
          @click="
            showDelModal(category._id, category.title, 'blogCategoryList')
          "
        >
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
import { onMounted } from "vue";
import { useModalStore } from "@/store/useModalStore";
import { useCategoryStore } from "@/store/useCategoryStore";
import LoadingScreen from "@/components/loadingScreen.vue";

const categoryStore = useCategoryStore();
const modalStore = useModalStore();

const showDelModal = (id, title, type) => {
  modalStore.deleteModal = true;
  modalStore.modalId = id;
  modalStore.modalTitle = title;
  modalStore.source = type;
};

onMounted(async () => {
  await categoryStore.fetchCategories();
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
