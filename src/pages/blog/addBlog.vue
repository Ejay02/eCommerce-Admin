<template>
  <div class="mt-4 card">
    <div class="d-flex justify-content-between">
      <h3 class="mb-4 text-capitalize">add blog</h3>
      <i class="bi bi-three-dots-vertical"></i>
    </div>
  </div>
  <router-view />
</template>

<script setup></script>

<style scoped>
.card {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
</style>
