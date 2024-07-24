<template>
  <div class="empty-container">
    <div class="empty-card">
      <a-empty :image="simpleImage" description="Nothing here yet" />
    </div>
  </div>
</template>

<script setup>
import { Empty } from "ant-design-vue";
const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
</script>

<style scoped>
.empty-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
}

.empty-card {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 300px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  background: #fff;
}
</style>
