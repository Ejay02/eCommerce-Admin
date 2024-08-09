<template>
  <LoadingScreen v-if="prodCategoryStore?.loading" />
  <div class="mt-4 card" v-if="prodCategoryStore?.categories?.length">
    <div class="d-flex justify-content-between">
      <h3 class="mb-4"></h3>
      <i class="bi bi-three-dots-vertical"></i>
    </div>

    <div class="mt-4">
      <div
        class="category-item"
        v-for="prod in prodCategoryStore?.categories"
        :key="prod._id"
      >
        <div class="category-title">
          <h4>{{ prod.title }}</h4>
          <span class="text-muted">
            Date Created: {{ new Date(prod.createdAt).toLocaleDateString() }}
          </span>
        </div>

        <div class="d-flex">
          <router-link
            :to="{ name: 'editCategory', params: { id: prod._id } }"
            class="btn justify-content-center align-content-center"
          >
            <i class="bi bi-pencil-square"></i>
          </router-link>

          <button
            class="btn"
            @click="showDelModal(prod._id, prod.title, 'prodCatList')"
          >
            <i class="bi bi-trash del-btn"></i>
          </button>
        </div>
      </div>
    </div>

    <Pagination
      :currentPage="prodCategoryStore.currentPage"
      :totalPages="prodCategoryStore.totalPages"
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
import { useProductCategoryStore } from "@/store/useProductCategoryStore";

const prodCategoryStore = useProductCategoryStore();
const modalStore = useModalStore();

const showDelModal = (id, title, type) => {
  modalStore.deleteModal = true;
  modalStore.modalId = id;
  modalStore.modalTitle = title;
  modalStore.source = type;
};

const fetchProdCategory = async (page = prodCategoryStore?.currentPage) => {
  await prodCategoryStore?.fetchBrands({
    page: page,
    limit: 10,
  });
};

const goToPage = (page) => {
  if (page > 0 && page <= prodCategoryStore?.totalPages) {
    fetchProdCategory(page);
  }
};

onMounted(async () => {
  await prodCategoryStore.fetchProdCategories();
});
</script>

<style scoped>
.btn {
  text-decoration: none;
  border: none;
}
</style>
