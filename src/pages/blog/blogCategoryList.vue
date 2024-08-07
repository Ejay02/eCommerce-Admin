<template>
  <LoadingScreen v-if="categoryStore.loading" />
  <div v-if="categoryStore.categories.length" class="mt-4 card">
    <div>
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
  </div>
  <div v-else>
    <Empty />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import Empty from "@/components/empty.vue";
import { useModalStore } from "@/store/useModalStore";
import LoadingScreen from "@/components/loadingScreen.vue";
import { useBlogCategoryStore } from "@/store/useBlogCategoryStore";

const categoryStore = useBlogCategoryStore();
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
.bi {
  color: red;
}

.btn {
  text-decoration: none;
  border: none;
}
</style>
