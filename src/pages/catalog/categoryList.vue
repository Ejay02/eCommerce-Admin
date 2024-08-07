<template>
  <LoadingScreen v-if="prodCategoryStore?.loading" />
  <div class="mt-4 card" v-if="prodCategoryStore?.categories?.length">
    <div class="d-flex justify-content-between">
      <h3 class="mb-4"></h3>
      <i class="bi bi-three-dots-vertical"></i>
    </div>

    <div class="">
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

        <button
          class="btn"
          @click="showDelModal(prod._id, prod.title, 'prodList')"
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
import { useProductCategoryStore } from "@/store/useProductCategoryStore";

const prodCategoryStore = useProductCategoryStore();
const modalStore = useModalStore();

const showDelModal = (id, title, type) => {
  modalStore.deleteModal = true;
  modalStore.modalId = id;
  modalStore.modalTitle = title;
  modalStore.source = type;
};

onMounted(async () => {
  await prodCategoryStore.fetchProdCategories();
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
