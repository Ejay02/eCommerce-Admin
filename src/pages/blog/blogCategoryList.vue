<template>
  <LoadingScreen v-if="categoryStore.loading" />
  <div v-if="categoryStore.categories.length" class="mt-4 card">
    <div class="d-flex justify-content-between">
      <h3 class="mb-4"></h3>
      <i class="bi bi-three-dots-vertical"></i>
    </div>

    <div class="mt-4">
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
        <div class="d-flex">
          <router-link
            class="btn justify-content-center align-content-center"
            :to="{ name: 'editBlogCategory', params: { id: category._id } }"
          >
            <i class="bi bi-pencil-square"></i>
          </router-link>
          <button
            class="btn"
            @click="
              showDelModal(category._id, category.title, 'blogCategoryList')
            "
          >
            <i class="bi bi-trash del-btn"></i>
          </button>
        </div>
      </div>
    </div>

    <Pagination
      :currentPage="categoryStore?.currentPage"
      :totalPages="categoryStore?.totalPages"
      @pageChange="goToPage"
    />
  </div>
  <div v-else>
    <Empty />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import Empty from "@/components/empty.vue";
import Pagination from "@/components/pagination.vue";
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

const fetchBlogCategories = async (page = categoryStore.currentPage) => {
  await categoryStore.fetchBrands({
    page: page,
    limit: 10,
  });
};

const goToPage = (page) => {
  if (page > 0 && page <= categoryStore.totalPages) {
    fetchBlogCategories(page);
  }
};

onMounted(async () => {
  await categoryStore.fetchCategories();
});
</script>

<style scoped>
.btn {
  text-decoration: none;
  border: none;
}
</style>
