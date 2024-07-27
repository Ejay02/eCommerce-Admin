<template>
  <router-view />
  <ScrollToTopButton />
  <DeleteModal v-if="modalStore.deleteModal" />
</template>

<script setup>
import { useModalStore } from "@/store/useModalStore";
import DeleteModal from "@/components/modals/deleteModal.vue";
import ScrollToTopButton from "@/components/scrollToTopBtn.vue";

const modalStore = useModalStore();
</script>

<style scoped></style>
