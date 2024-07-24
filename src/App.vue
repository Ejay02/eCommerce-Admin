<template>
  <router-view />
  <ScrollToTopButton />
  <DeleteModal />
</template>

<script setup>
import DeleteModal from "./components/modals/deleteModal.vue";
import ScrollToTopButton from "@/components/scrollToTopBtn.vue";
</script>

<style scoped></style>
