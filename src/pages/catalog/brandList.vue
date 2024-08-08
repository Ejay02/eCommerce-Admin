<template>
  <LoadingScreen v-if="brandStore?.loading" />
  <div class="mt-4 card" v-if="brandStore?.brands?.length">
    <div class="d-flex justify-content-between">
      <h3 class="mb-4"></h3>
      <i class="bi bi-three-dots-vertical"></i>
    </div>

    <div class="mt-4">
      <div
        class="category-item"
        v-for="brand in brandStore?.brands"
        :key="brand._id"
      >
        <div class="category-title">
          <h4>{{ brand.title }}</h4>
          <span class="text-muted">
            Date Created: {{ new Date(brand.createdAt).toLocaleDateString() }}
          </span>
        </div>

        <div class="d-flex">
          <router-link
            :to="{ name: 'editBrand', params: { id: brand._id } }"
            class="btn justify-content-center align-content-center"
          >
            <i class="bi bi-pencil-square"></i>
          </router-link>
          <button
            class="btn"
            @click="showDelModal(brand._id, brand.title, 'brandList')"
          >
            <i class="bi bi-trash del-btn"></i>
          </button>
        </div>
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
import { useBrandStore } from "@/store/useBrandStore";
import { useModalStore } from "@/store/useModalStore";
import LoadingScreen from "@/components/loadingScreen.vue";

const brandStore = useBrandStore();
const modalStore = useModalStore();

const showDelModal = (id, title, type) => {
  modalStore.deleteModal = true;
  modalStore.modalId = id;
  modalStore.modalTitle = title;
  modalStore.source = type;
};

onMounted(async () => {
  await brandStore.fetchBrands();
});
</script>

<style scoped>
.btn {
  text-decoration: none;
  border: none;
}
</style>
